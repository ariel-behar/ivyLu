import { Router } from 'express';

import clientController from '../controllers/clientController.js'
import staffController from '../controllers/staffController.js'
import serviceController from '../controllers/serviceController.js'
import productController from '../controllers/productController.js'
import scheduleController from '../controllers/scheduleController.js'

const router = Router()

router.use('/clients', clientController)
router.use('/staff', staffController)
router.use('/services', serviceController)
router.use('/products', productController)
router.use('/schedule', scheduleController)

export default router;