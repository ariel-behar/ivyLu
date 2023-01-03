import { Router } from 'express';

import userController from '../controllers/userController.js'
import serviceController from '../controllers/serviceController.js'
import productController from '../controllers/productController.js'

import userEntityMiddleware from '../middlewares/userEntityMiddleware.js';

const router = Router()

router.use('/clients', userEntityMiddleware, userController)
router.use('/staff', userEntityMiddleware, userController)
router.use('/services', serviceController)
router.use('/products', productController)

export default router;