import { Router } from 'express';
import bcrypt from 'bcrypt'

import * as userServices from '../services/userServices.js'
import {isAuth, isGuest} from '../middlewares/authMiddleware.js'

import generateAuthToken from '../utils/generateAuthToken.js'

const router = Router()

router.get('/', async (req, res) => {

    if(Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {
            
            let users = await userServices.getManyFilteredBy('Client', filters);
    
            res.json(users)
        } catch (err) {
            res.status(500).send(err)
        }
    }  else {
        try {
            let users = await userServices.getAll('Client');
    
            res.json(users)
        } catch (err) {
            
            res.status(500).send(err)
        }
    }
})

router.post('/register', async (req, res) => {
    let { firstName, lastName, email, phone, gender, role, imgUrl, password } = req.body;

    try {
        let userExists = await userServices.getOneByEmail('Client', email);

        if(!userExists) {
            userExists = await userServices.getOneByEmail('Staff', email);
        }
        
        if(userExists){
           throw {statusCode: 403, message: "This email address is already being used by another user."}
        } else {
            try {
                let userResponse;

                if(imgUrl) {
                    userResponse = await userServices.register('Client', {firstName, lastName,email, phone, gender, role, imgUrl, password });
                } else {
                    userResponse = await userServices.register('Client', {firstName, lastName,email, phone, gender, role, password });
                }

                if (userResponse) {
                    let user = {
                        userId: userResponse._id,
                        firstName: userResponse.firstName,
                        lastName: userResponse.lastName,
                        email: userResponse.email,
                        gender: userResponse.gender,
                        phone: userResponse.phone,
                        role: userResponse.role,
                        imgUrl: userResponse.imgUrl
                    };
        
                    let authToken = generateAuthToken(user);

                    return res.json({ ...user, authToken });
                }
            } catch(err) {
                res.status(400).send(err)
            }
        }
    } catch (err) {
        res.status(400).send(err)
    }

})

router.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;
    
    try {
        let userResponse = await userServices.login('Client',email)

        if(!userResponse) {
            userResponse = await userServices.login('Staff', email)
        }

        if(userResponse) {
            let isValidPassword = await bcrypt.compare(password, userResponse.password);

            if(isValidPassword) {
                let user = {
                    userId: userResponse._id,
                    firstName: userResponse.firstName,
                    lastName: userResponse.lastName,
                    email: userResponse.email,
                    gender: userResponse.gender,
                    phone: userResponse.phone,
                    role: userResponse.role,
                    imgUrl: userResponse.imgUrl
                };

                let authToken = generateAuthToken(user);

                return res.json({ ...user, authToken });
                
            } else {
                throw {statusCode: 401, message: 'Username or password are incorrect.' }
            }
        } else {
            throw {statusCode: 401, message: 'Username or password are incorrect.' }
        }
    } catch (err) {
        if(err.hasOwnProperty('statusCode')){
            res.status(err.statusCode).send(err)
        } else {
            res.status(400).send(err)
        }
    }
})

router.get('/:userId/delete', async (req, res) => {
    let userId = req.params.userId

    try {
        let deleteUserResponse = await userServices.deleteOne('Client', userId);

        if (deleteUserResponse) {
            res.json({message: 'Record has successfully been deleted'});
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }

})

export default router;