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

router.get('/:userId', isAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.userId;

    try {
        let staffMember = await staffServices.getOne(userId);

        res.json(staffMember)
    } catch (err) {
        next(err)
    }
})

router.post('/register', isAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let { firstName, lastName, email, phone, gender, password, role, about, imgUrl } = req.body;

    try {
        let userExistsResponse: LeanDocument<IClientDocument> | LeanDocument<IStaffDocument> | null;
        
        //Check if user exists in clients
        userExistsResponse = await clientServices.getOneByEmail(email)

        if (!userExistsResponse) {
            // Check if user exits in staff
            userExistsResponse = await staffServices.getOneByEmail(email)
        }

        if (userExistsResponse) {
            next(new InvalidDataError(`Email address "${userExistsResponse.email}" is already taken.`));
        } else {
            try {
                let staffRegisterResponse;

                if (role == 2) {
                    staffRegisterResponse = await staffServices.register({ firstName, lastName, email, phone, gender, password, role, imgUrl, about });
                } else {
                    staffRegisterResponse = await staffServices.register({ firstName, lastName, email, phone, gender, password, role });
                }

                if (staffRegisterResponse) {
                    let newUser = {
                        _id: staffRegisterResponse._id,
                        firstName: staffRegisterResponse.firstName,
                        lastName: staffRegisterResponse.lastName,
                        email: staffRegisterResponse.email,
                        gender: staffRegisterResponse.gender,
                        phone: staffRegisterResponse.phone,
                        role: staffRegisterResponse.role,
                        imgUrl: staffRegisterResponse.imgUrl
                    };

                    let authToken = generateAuthToken(newUser);

                    return res.status(201).location(`/api/staff/${newUser._id}`).json({ ...newUser, authToken });
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

router.patch('/:userId', isAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.userId;
    let updateFields = req.body;

    try {
        if (Object.keys(updateFields).includes('newPassword')) {
            let userLoginResponse = await staffServices.getOne(userId)
            let oldPassword = updateFields.oldPassword
            let newPassword = updateFields.newPassword
            let isOldPasswordValid;

            if(userLoginResponse) {

                isOldPasswordValid = await bcrypt.compare(oldPassword, userLoginResponse?.password);

                if(isOldPasswordValid) {
                    try {
                        let hashedPassword = await bcrypt.hash(newPassword, Number(process.env.JWT_SALT))
                        updateFields.password = hashedPassword;
                    } catch(err: any) {
                        if (err.message === 'data and salt arguments required') {
                            next(new Error('An error occurred while attempting to update your password. Please try again'))
                        }
                        next(new Error(err.message))
                    }
                } else {
                    next(new AuthenticationError('Old password is incorrect'));
                }
            }
        }
        let staffEditResponse = await staffServices.update(userId, updateFields);

        if (staffEditResponse) {
            let user = {
                _id: staffEditResponse._id,
                firstName: staffEditResponse.firstName,
                lastName: staffEditResponse.lastName,
                email: staffEditResponse.email,
                gender: staffEditResponse.gender,
                phone: staffEditResponse.phone,
                role: staffEditResponse.role,
                imgUrl: staffEditResponse.imgUrl
            };

            return res.json(user);
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/:userId', isAuth, async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.userId

    try {
        let deleteStaffResponse = await staffServices.deleteOne(userId);

        if (deleteStaffResponse) {
            res.json({ message: 'Staff member has successfully been deleted' });
        }
    } catch (err: any) {
        next(err)
    }

})

export default router;