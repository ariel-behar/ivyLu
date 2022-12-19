const router = require('express').Router();

const authController = require('../controllers/authController.js')

router.use('/users', authController)


module.exports = router;