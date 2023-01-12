import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt'

import * as staffServices from '../services/staffServices.js'
import * as clientServices from '../services/clientServices.js'

import generateAuthToken from '../utils/generateAuthToken.js'
import { isAuth, isAdmin, isGuest } from '../middlewares/authMiddleware.js';
import { IClientDocument } from '../models/Client.js';
import { IStaffDocument } from '../models/Staff.js';
import { LeanDocument } from 'mongoose';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    if (Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {

            let users = await staffServices.getManyFilteredBy(filters);

            res.json(users)
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        try {
            let users = await staffServices.getAll();

            res.json(users)
        } catch (err) {

            res.status(500).send(err)
        }
    }
})

router.post('/register', isAuth, isAdmin, async (req: Request, res: Response) => {
    let { firstName, lastName, email, phone, gender, password, role, about, imgUrl } = req.body;
    try {
        let userExistsResponse: IClientDocument | IStaffDocument | null;

        //Check clients
        userExistsResponse = await clientServices.getOneByEmail(email)

        if (!userExistsResponse) {
            // Check staff
            userExistsResponse = await staffServices.getOneByEmail(email)
        }

        if (userExistsResponse) {
            throw { statusCode: 403, message: "This email address is already being used by another user." }
        } else {
            try {
                let userResponse;

                if (role == 2) {
                    userResponse = await staffServices.register({ firstName, lastName, email, phone, gender, password, role, imgUrl, about });
                } else {
                    userResponse = await staffServices.register({ firstName, lastName, email, phone, gender, password, role });
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
            } catch (err) {
                res.status(400).send(err)
            }
        }
    } catch (err) {
        res.status(400).send(err)
    }

})

router.post('/login', isGuest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let userLoginResponse: LeanDocument<IClientDocument> & LeanDocument<IStaffDocument> | null;

        //Check clients
        userLoginResponse = await clientServices.login(email)

        if (!userLoginResponse) {
            // Check staff
            userLoginResponse = await staffServices.login(email)
        }

        if (userLoginResponse) {
            let isValidPassword = await bcrypt.compare(password, userLoginResponse.password);

            if (isValidPassword) {
                let user = {
                    userId: userLoginResponse._id,
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
                throw { statusCode: 401, message: 'Username or password are incorrect.' }
            }
        } else {
            throw { statusCode: 401, message: 'Username or password are incorrect.' }
        }
    } catch (err: any) {
        if (err.hasOwnProperty('statusCode')) {
            res.status(err.statusCode).send(err)
        } else {
            res.status(400).send(err)
        }
    }
})

router.get('/:userId/delete', isAuth, async (req: Request, res: Response) => {
    let userId = req.params.userId

    try {
        let deleteUserResponse = await staffServices.deleteOne(userId);

        if (deleteUserResponse) {
            res.json({ message: 'Record has successfully been deleted' });
        }
    } catch (err: any) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }

})

export default router;