import { Router, Request, Response, NextFunction } from 'express';
import { LeanDocument } from 'mongoose';
import bcrypt from 'bcrypt'

import * as staffServices from '../services/staffServices.js'
import * as clientServices from '../services/clientServices.js'

import { IClientDocument } from '../models/Client.js';
import { IStaffDocument } from '../models/Staff.js';
import { AuthenticationError, InvalidDataError } from '../models/Errors.js';

import {isGuest} from '../middlewares/authMiddleware.js'

import generateAuthToken from '../utils/generateAuthToken.js'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {

    if(Object.entries(req.query).length > 0) {
        let filters = req.query;

        try {
            let filteredClients = await clientServices.getManyFilteredBy(filters);
    
            res.json(filteredClients)
        } catch (err: any) {
            next(err)
        }
    }  else {
        try {
            let clients = await clientServices.getAll();
    
            res.json(clients)
        } catch (err: any) {
            next(err)
        }
    }
})

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    let { firstName, lastName, email, phone, gender, role, password } = req.body;

    try {
        let userExistsResponse: IClientDocument | IStaffDocument | null; 

        //Check clients
        userExistsResponse = await clientServices.getOneByEmail(email)

        if(!userExistsResponse) {
            // Check staff
            userExistsResponse = await staffServices.getOneByEmail(email)
        }
        
        if(userExistsResponse){
            next(new InvalidDataError(`Email address "${userExistsResponse.email}" is already taken.`));
        } else {
            try {
                let clientRegisterResponse = await clientServices.register({firstName, lastName,email, phone, gender, role: Number(role), password });

                if (clientRegisterResponse) {
                    let client = {
                        _id: clientRegisterResponse._id,
                        firstName: clientRegisterResponse.firstName,
                        lastName: clientRegisterResponse.lastName,
                        email: clientRegisterResponse.email,
                        phone: clientRegisterResponse.phone,
                        gender: clientRegisterResponse.gender,
                        role: clientRegisterResponse.role,
                    };
        
                    let authToken = generateAuthToken(client);

                    return res.json({ ...client, authToken });
                }
            } catch(err: any) {
                next(err)
            }
        }
    } catch (err: any) {
        next(err)
    }

})

router.post('/login', isGuest, async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    
    try {
        let userLoginResponse: LeanDocument<IClientDocument> & LeanDocument<IStaffDocument> | null; 

        //Check clients
        userLoginResponse = await clientServices.login(email)

        if(!userLoginResponse) {
            // Check staff
            userLoginResponse = await staffServices.login(email)
        }

        if(userLoginResponse) {
            let isValidPassword = await bcrypt.compare(password, userLoginResponse.password);

            if(isValidPassword) {
                let user= {
                    _id: userLoginResponse._id,
                    firstName: userLoginResponse.firstName,
                    lastName: userLoginResponse.lastName,
                    email: userLoginResponse.email,
                    gender: userLoginResponse.gender,
                    phone: userLoginResponse.phone,
                    role: userLoginResponse.role,
                    imgUrl: userLoginResponse.imgUrl
                };

                let authToken = generateAuthToken(user);

                return res.json({ ...user, authToken });
                
            } else {
                next(new AuthenticationError(`Username or password are incorrect.`));
            }
        } else {
            next(new AuthenticationError(`Username or password are incorrect.`));
        }
    } catch (err: any) {
        next(err)
    }
})

router.get('/:userId/delete', async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.userId

    try {
        let deleteClientResponse = await clientServices.deleteOne(userId);

        if (deleteClientResponse) {
            res.json({message: 'Client has successfully been deleted'});
        }
    } catch (err: any) {
        next(err)
    }

})

export default router;