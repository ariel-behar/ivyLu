import { Router } from 'express';

import userController from '../controllers/userController.js'
import serviceController from '../controllers/serviceController.js'
import productController from '../controllers/productController.js'

const router = Router()

router.use('/users', userController)
router.use('/services', serviceController)
router.use('/products', productController)

export default router;