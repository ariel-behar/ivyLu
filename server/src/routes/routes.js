import { Router } from 'express';

import clientController from '../controllers/clientController.js'
import staffController from '../controllers/staffController.js'
import serviceController from '../controllers/serviceController.js'
import productController from '../controllers/productController.js'

import userEntityMiddleware from '../middlewares/userEntityMiddleware.js';

const router = Router()

router.use('/clients', clientController)
router.use('/staff', staffController)
router.use('/services', serviceController)
router.use('/products', productController)

export default router;