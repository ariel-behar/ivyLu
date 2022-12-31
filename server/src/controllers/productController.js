import { Router } from 'express'

import * as productServices from '../services/productServices.js'

const router = Router();

router.get('/', async (req, res) => {
    try {
        let products = await productServices.getAll();

        res.json(products)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/:productId', async (req, res) => {
    let productId = req.params.productId;

    try {
        let product = await productServices.getOne(productId);

        res.json(product)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/create', async (req, res) => {
    let { title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId } = req.body;

    try {
        let productExists = await productServices.getOneByTitle(title);

        if (productExists) {
            throw {statusCode: 403, message: "A product with this Title already exists"}
        } else {
            try {
                let createProductResponse = await productServices.create({ title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId });

                if (createProductResponse) {
                    let product = {
                        productId: createProductResponse._id,
                        title: createProductResponse.title,
                        description: createProductResponse.description,
                        additionalComments: createProductResponse.additionalComments,
                        imgUrl: createProductResponse.imgUrl,
                        price: createProductResponse.price,
                        volume: createProductResponse.volume,
                        volumeMeasurementUnit: createProductResponse.volumeMeasurementUnit, 
                        productCode: createProductResponse.productCode,
                        status: createProductResponse.status
                    };

                    res.json(product);
                }
            } catch (err) {
                res.status(400).send(err)
            }
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }
})

router.post('/:productId/edit', async (req, res) => {
    let productId = req.params.productId
    let { title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status } = req.body;

    let product = { title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status }

    try {
        let editProductResponse = await productServices.updateOne(productId, product);

        if (editProductResponse) {
            let product = {
                productId: editProductResponse._id,
                title: editProductResponse.title,
                description: editProductResponse.description,
                additionalComments: editProductResponse.additionalComments,
                imgUrl: editProductResponse.imgUrl,
                price: editProductResponse.price,
                volume: editProductResponse.volume,
                volumeMeasurementUnit: editProductResponse.volumeMeasurementUnit, 
                productCode: editProductResponse.productCode,
                status: editProductResponse.status
            };

            res.json(product);
        } else {
            throw {statusCode: 401, message: 'Bad request'}
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }
})

router.get('/:productId/delete', async (req, res) => {
    let productId = req.params.productId

    try {
        let deleteProductResponse = await productServices.deleteOne(productId);

        if (deleteProductResponse) {
            res.json({message: 'Record has successfully been deleted'});
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }

})

export default router;