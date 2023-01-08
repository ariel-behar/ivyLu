import { Router } from 'express';

import * as ordersServices from '../services/ordersServices.js'
import { isAuth, isClient, isHairdresserOperatorAdmin } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', isAuth, isHairdresserOperatorAdmin, async (req, res) => {
    try {
        let orderResponse = await ordersServices.getAll()

        if (orderResponse) {
            let structuredOrderResponse = orderResponse.map(orderItem => {
                return {
                    _id: orderItem._id,
                    createdAt: orderItem.createdAt,
                    status: orderItem.status,
                    comments: orderItem.comments,
                    client: {
                        firstName: orderItem.client.firstName,
                        lastName: orderItem.client.lastName,
                        phone: orderItem.client.phone,
                        gender: orderItem.client.gender,
                        email: orderItem.client.email,
                    },
                    product: {
                        title: orderItem.product.title,
                        description: orderItem.product.description,
                        imgUrl: orderItem.product.imgUrl,
                        price: orderItem.product.price,
                        volume: orderItem.product.volume,
                        volumeMeasurementUnit: orderItem.product.volumeMeasurementUnit,
                        productCategory: orderItem.product.productCategory,
                        createdAt: orderItem.product.createdAt,
                        productCode: orderItem.product.productCode
                    }
                }
            })

            res.json(structuredOrderResponse)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/create', isAuth, isClient, async (req, res) => {
    let { client, product, status } = req.body;

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