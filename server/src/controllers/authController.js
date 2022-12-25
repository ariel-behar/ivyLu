const router = require('express').Router();
const bcrypt = require('bcrypt');

const authService = require('../services/authService')

const generateAuthToken = require('../utils/generateAuthToken.js')


router.post('/register', async (req, res) => {
    let { firstName, lastName, email, phone, gender, role, password } = req.body;

    try {
        let userExists = await authService.findOneByEmail(email);
        
        if(userExists){
            return res.status(500).json({message: "This email address is already being used by another user."})
        } else {
            try {
                let userResponse = await authService.register({firstName, lastName, email, phone, gender,role, password});
        
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
                res.status(500).json(err)
            }
        }

    } catch (err) {
        res.json(err.message)
    }

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        let userResponse = await authService.login(email)

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
                throw { message: 'Username or password are incorrect.' }
            }

        } else {
            throw { message: 'Username or password are incorrect.' }
        }

    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router;