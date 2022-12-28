const router = require('express').Router();

const authController = require('../controllers/authController.js')
const serviceController = require('../controllers/serviceController.js')
const productController = require('../controllers/productController.js')

router.use('/users', authController)
router.use('/services', serviceController)
router.use('/products', productController)


module.exports = router;