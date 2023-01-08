import { Router } from 'express';

import * as ordersServices from '../services/ordersServices.js'
import { isAuth, isClient } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/create', isAuth, isClient, async (req, res) => {
    let { client, product, status } = req.body;
    console.log('client:', client)

    try {
        let orderCreateResponse = await ordersServices.create({client, product, status})

        if (orderCreateResponse) {
            let populatedOrder = await ordersServices.getOne(orderCreateResponse._id)

            let order = {
                _id: populatedOrder._id,
                createdAt: populatedOrder.createdAt,
                status: populatedOrder.status,
                client: {
                    firstName: populatedOrder.client.firstName,
                    lastName: populatedOrder.client.lastName,
                    phone: populatedOrder.client.phone,
                    gender: populatedOrder.client.gender,
                    email: populatedOrder.client.email,
                },
                product: {
                    title: populatedOrder.product.title,
                    description: populatedOrder.product.description,
                    imgUrl: populatedOrder.product.imgUrl,
                    price: populatedOrder.product.price,
                    volume: populatedOrder.product.volume,
                    volumeMeasurementUnit: populatedOrder.product.volumeMeasurementUnit,
                    productCategory: populatedOrder.product.productCategory,
                    createdAt: populatedOrder.product.createdAt
                }
            };

            return res.json(order)
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


export default router;