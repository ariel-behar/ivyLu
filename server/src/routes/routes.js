const router = require('express').Router();

const authController = require('../controllers/authController.js')
const serviceController = require('../controllers/serviceController.js')

router.use('/users', authController)
router.use('/services', serviceController)


module.exports = router;