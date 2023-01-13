import { Router, Request, Response, NextFunction } from 'express';
import { LeanDocument } from 'mongoose';
import bcrypt from 'bcrypt'

import * as staffServices from '../services/staffServices.js'
import * as clientServices from '../services/clientServices.js'

import { IClientDocument } from '../models/Client.js';
import { IStaffDocument } from '../models/Staff.js';
import { AuthenticationError, InvalidDataError } from '../models/Errors.js';

import { isAuth, isAdmin, isGuest } from '../middlewares/authMiddleware.js';

import generateAuthToken from '../utils/generateAuthToken.js'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    if (Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {
            let filteredStaffMembers = await staffServices.getManyFilteredBy(filters);

            res.json(filteredStaffMembers)
        } catch (err: any) {
            next(err)
        }
    } else {
        try {
            let staffMembers = await staffServices.getAll();

            res.json(staffMembers)
        } catch (err: any) {
            next(err)
        }
    }
})

router.post('/register', isAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let { firstName, lastName, email, phone, gender, password, role, about, imgUrl } = req.body;

    try {
        let userExistsResponse: LeanDocument<IClientDocument> | LeanDocument<IStaffDocument> | null;
        
        //Check clients
        userExistsResponse = await clientServices.getOneByEmail(email)

        if (!userExistsResponse) {
            // Check staff
            userExistsResponse = await staffServices.getOneByEmail(email)
        }

        if (userExistsResponse) {
            next(new InvalidDataError(`Email address "${userExistsResponse.email}" is already taken.`));
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
                next(err)
            }
        }
    } catch (err) {
        next(err)
    }

})

router.post('/login', isGuest, async (req: Request, res: Response, next: NextFunction) => {
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
                next(new AuthenticationError(`Username or password are incorrect.`));
            }
        } else {
            next(new AuthenticationError(`Username or password are incorrect.`));
        }
    } catch (err: any) {
        next(err)
    }
})

router.get('/:userId/delete', isAuth, async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.userId

    try {
        let deleteUserResponse = await staffServices.deleteOne(userId);

        if (deleteUserResponse) {
            res.json({ message: 'Staff member has successfully been deleted' });
        }
    } catch (err: any) {
        next(err)
    }

})

export default router;