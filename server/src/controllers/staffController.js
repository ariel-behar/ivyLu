import { Router } from 'express';
import bcrypt from 'bcrypt'

import * as staffServices from '../services/staffServices.js'
import * as clientServices from '../services/clientServices.js'

import generateAuthToken from '../utils/generateAuthToken.js'

const router = Router()

router.get('/', async (req, res) => {
    if(Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {
            let users = await staffServices.getManyFilteredBy(filters);
    
            res.json(users)
        } catch (err) {
            res.status(500).send(err)
        }
    }  else {
        try {
            let users = await staffServices.getAll();
    
            res.json(users)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    
})

router.post('/register', async (req, res) => {
    let { firstName, lastName, email, phone, gender, role, imgUrl, password } = req.body;

    try {
        let userExists = await staffServices.getOneByEmail(email);
        
        if(userExists){
           throw {statusCode: 403, message: "This email address is already being used by another user."}
        } else {
            try {
                let userResponse;

                if(imgUrl) {
                    userResponse = await staffServices.register({firstName, lastName,email, phone, gender, role, imgUrl, password });
                } else {
                    userResponse = await staffServices.register({firstName, lastName,email, phone, gender, role, password });
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
        
                    let AUTH_TOKEN = generateAuthToken(user);

                    return res.json({ ...user, AUTH_TOKEN });
                }
            } catch(err) {
                res.status(400).send(err)
            }
        }
    } catch (err) {
        res.status(400).send(err)
    }

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        let userResponse = await staffServices.login(email)

        if(!userResponse) {
            userResponse = await clientServices.login(email)
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

                let AUTH_TOKEN = generateAuthToken(user);

                return res.json({ ...user, AUTH_TOKEN });
                
            } else {
                throw {statusCode: 401, message: 'Username or password are incorrect.' }
            }
        } else {
            throw {statusCode: 401, message: 'Username or password are incorrect.' }
        }
    } catch (err) {
        res.status(err.statusCode).send(err)
    }
})

router.get('/:userId/delete', async (req, res) => {
    let userId = req.params.userId

    try {
        let deleteUserResponse = await staffServices.deleteOne(userId);

        if (deleteUserResponse) {
            res.json({message: 'Record has successfully been deleted'});
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }

})

export default router;