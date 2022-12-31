import { Router } from 'express';
import bcrypt from 'bcrypt'

import * as userServices from '../services/userServices.js'

import generateAuthToken from '../utils/generateAuthToken.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        let users = await userServices.getAll();

        res.json(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/register', async (req, res) => {
    let { firstName, lastName, email, phone, gender, role, password } = req.body;

    try {
        let userExists = await userServices.getOneByEmail(email);
        
        if(userExists){
           throw {status: 403, message: "This email address is already being used by another user."}
        } else {
            try {
                let userResponse = await userServices.register({firstName, lastName,email, phone, gender, role, password});
        
                if (userResponse) {
                    let user = {
                        userId: userResponse._id,
                        firstName: userResponse.firstName,
                        lastName: userResponse.lastName,
                        email: userResponse.email,
                        gender: userResponse.gender,
                        phone: userResponse.phone,
                        role: userResponse.role
                    };
        
                    let AUTH_TOKEN = generateAuthToken(user);

                    return res.json({ ...user, AUTH_TOKEN });
                }
            } catch(err) {
                res.status(400).send(err)
            }
        }
    } catch (err) {
        res.status(err.status).send(err)
    }

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        let userResponse = await userServices.login(email)

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
                    role: userResponse.role
                };

                let AUTH_TOKEN = generateAuthToken(user);

                return res.json({ ...user, AUTH_TOKEN });
                
            } else {
                throw {status: 401, message: 'Username or password are incorrect.' }
            }
        } else {
            throw {status: 401, message: 'Username or password are incorrect.' }
        }
    } catch (err) {
        res.status(err.status).send(err)
    }
})

export default router;