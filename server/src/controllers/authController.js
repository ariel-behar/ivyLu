const router = require('express').Router();

const authService = require('../services/authService')

const generateAuthToken = require('../utils/generateAuthToken.js')


router.post('/register', async (req, res) => {
    let { firstName, lastName, email, phone, gender, role, password } = req.body;

    try {
        let userExists = await authService.findOneByEmail(email);
        
        if(userExists){
            res.status(500).json({message: "This email address is already being used by another user."})
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

module.exports = router;