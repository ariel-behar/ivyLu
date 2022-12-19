const router = require('express').Router();

const authService = require('../services/authService')

const logUserIn = require('../utils/logUserIn.js')


router.post('/register', async (req, res) => {
    let { firstName, lastName, email, phone, gender, password } = req.body;

    try {
        let userResponse = await authService.register({firstName, lastName, email, phone, gender, password});

        if (userResponse) {
            let user = {
                userId: userResponse._id,
                firstName: userResponse.firstName,
                lastName: userResponse.lastName,
                email: userResponse.email,
                gender: userResponse.gender,
                phone: userResponse.phone
            };

            let AUTH_TOKEN = logUserIn(user);

            return res.json({ ...user, AUTH_TOKEN });
        }

    } catch (err){
        console.log(err)
    }


})

module.exports = router;