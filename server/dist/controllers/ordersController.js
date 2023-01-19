var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import * as ordersServices from '../services/ordersServices.js';
import { isAuth, isClient, isHairdresserOperatorAdmin } from '../middlewares/authMiddleware.js';
const router = Router();
router.get('/', isAuth, isHairdresserOperatorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let orderResponse = yield ordersServices.getAll();
        if (orderResponse) {
            let structuredOrderResponse = orderResponse.map((order) => {
                let client;
                let product;
                if (typeof order.client != 'string') {
                    client = {
                        firstName: order.client.firstName,
                        lastName: order.client.lastName,
                        phone: order.client.phone,
                        gender: order.client.gender,
                        email: order.client.email,
                    };
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
                    };
                }
                return {
                    _id: order._id,
                    createdAt: order.createdAt,
                    status: order.status,
                    client,
                    product
                };
            });
            res.json(structuredOrderResponse);
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:clientId', isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let clientId = req.params['clientId'];
    try {
        let orderResponse = yield ordersServices.getAllClientsOrders(clientId);
        if (orderResponse) {
            let structuredOrderResponse = orderResponse.map((order) => {
                let client;
                let product;
                if (typeof order.client != 'string') {
                    client = {
                        firstName: order.client.firstName,
                        lastName: order.client.lastName,
                        phone: order.client.phone,
                        gender: order.client.gender,
                        email: order.client.email,
                    };
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
                    };
                }
                return {
                    _id: order._id,
                    createdAt: order.createdAt,
                    status: order.status,
                    client,
                    product
                };
            });
            res.json(structuredOrderResponse);
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/create', isAuth, isClient, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { clientId, productId, status } = req.body;
    try {
        let orderCreateResponse = yield ordersServices.create({ client: clientId, product: productId, status });
        if (orderCreateResponse) {
            let populatedOrder = yield ordersServices.getOne(orderCreateResponse._id);
            if (populatedOrder) {
                let client;
                let product;
                if (typeof populatedOrder.client != 'string') {
                    client = {
                        firstName: populatedOrder.client.firstName,
                        lastName: populatedOrder.client.lastName,
                        phone: populatedOrder.client.phone,
                        gender: populatedOrder.client.gender,
                        email: populatedOrder.client.email,
                    };
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
                    };
                }
                let newOrder = {
                    _id: populatedOrder._id,
                    createdAt: populatedOrder.createdAt,
                    status: populatedOrder.status,
                    client,
                    product
                };
                return res.status(201).location(`/api/orders/${newOrder._id}`).json(newOrder);
            }
        }
    }
    catch (err) {
        next(err);
    }
}));
export default router;
//# sourceMappingURL=ordersController.js.map