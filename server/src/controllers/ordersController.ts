import { Router, Request, Response } from 'express';

import * as ordersServices from '../services/ordersServices.js'
import { isAuth, isClient, isHairdresserOperatorAdmin } from '../middlewares/authMiddleware.js'
import { IOrderDocument } from '../models/Order.js';
import { LeanDocument } from 'mongoose';

const router = Router()

router.get('/', isAuth, isHairdresserOperatorAdmin, async (req: Request, res: Response) => {
    try {
        let orderResponse: LeanDocument<IOrderDocument>[]= await ordersServices.getAll()

        if (orderResponse) {
            let structuredOrderResponse = orderResponse.map((order: IOrderDocument) => {
                let client;
                let product;

                if (typeof order.client != 'string') {
                    client = {
                        firstName: order.client.firstName,
                        lastName: order.client.lastName,
                        phone: order.client.phone,
                        gender: order.client.gender,
                        email: order.client.email,
                    }
                }
                
                if (typeof order.product != 'string') {
                    product = {
                        title: order.product.title,
                        description: order.product.description,
                        imgUrl: order.product.imgUrl,
                        price: order.product.price,
                        volume: order.product.volume,
                        volumeMeasurementUnit: order.product.volumeMeasurementUnit,
                        productCategory: order.product.productCategory,
                        createdAt: order.product.createdAt,
                        productCode: order.product.productCode
                    }
                }

                return {
                    _id: order._id,
                    createdAt: order.createdAt,
                    status: order.status,
                    client,
                    product
                }
            })

            res.json(structuredOrderResponse)
        }
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

router.post('/create', isAuth, isClient, async (req: Request, res: Response) => {
    let { clientId, productId, status } = req.body;

    try {
        let orderCreateResponse: IOrderDocument = await ordersServices.create({client: clientId, product: productId, status})

        if (orderCreateResponse) {
            let populatedOrder: LeanDocument<IOrderDocument> | null = await ordersServices.getOne(orderCreateResponse._id)

            if(populatedOrder) {
                let client;
                let product;
                
                if (typeof populatedOrder.client != 'string') {
                    client = {
                        firstName: populatedOrder.client.firstName,
                        lastName: populatedOrder.client.lastName,
                        phone: populatedOrder.client.phone,
                        gender: populatedOrder.client.gender,
                        email: populatedOrder.client.email,
                    }
                }
                
                if (typeof populatedOrder.product != 'string') {
                    product = {
                        title: populatedOrder.product.title,
                        description: populatedOrder.product.description,
                        imgUrl: populatedOrder.product.imgUrl,
                        price: populatedOrder.product.price,
                        volume: populatedOrder.product.volume,
                        volumeMeasurementUnit: populatedOrder.product.volumeMeasurementUnit,
                        productCategory: populatedOrder.product.productCategory,
                        createdAt: populatedOrder.product.createdAt,
                        productCode: populatedOrder.product.productCode
                    }
                }
                let order = {
                    _id: populatedOrder._id,
                    createdAt: populatedOrder.createdAt,
                    status: populatedOrder.status,
                    client,
                    product
                };
    
                return res.json(order)
            }
           
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


export default router;