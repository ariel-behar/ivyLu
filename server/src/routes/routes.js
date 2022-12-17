const router = require('express').Router();


router.use('/users', authController)


module.exports = router;