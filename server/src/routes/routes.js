const router = require('express').Router();

const userController = require('../controllers/userController.js')
const serviceController = require('../controllers/serviceController.js')
const productController = require('../controllers/productController.js')

router.use('/users', userController)
router.use('/services', serviceController)
router.use('/products', productController)


module.exports = router;