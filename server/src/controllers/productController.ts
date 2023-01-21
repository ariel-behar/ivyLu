import { Router, Request, Response, NextFunction } from 'express'

import * as productServices from '../services/productServices.js'

import { InvalidDataError } from '../models/Errors.js';

import { isAuth, isOperatorAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    if (Object.entries(req.query).length > 0) {
        let filters = req.query;

        try {
            let filteredProducts = await productServices.getManyFilteredBy(filters);

            res.json(filteredProducts)
        } catch (err: any) {
            next(err)
        }
    } else {
        try {
            let products = await productServices.getAll();
    
            res.json(products)
        } catch (err) {
            next(err)
        }
    }
})

router.get('/:productId', async (req: Request, res: Response, next: NextFunction) => {
    let productId = req.params.productId;

    try {
        let product = await productServices.getOne(productId);

        res.json(product)
    } catch (err) {
        next(err)
    }
})

router.post('/create', isAuth, isOperatorAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let { title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId } = req.body;

    try {
        let productExists = await productServices.getOneByTitle(title);

        if (productExists) {
            next(new InvalidDataError(`A product with title "${title}" already exists`))
        } else {
            try {
                let createProductResponse = await productServices.create({ title, description,productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId });

                if (createProductResponse) {
                    let newProduct = {
                        _id: createProductResponse._id,
                        title: createProductResponse.title,
                        description: createProductResponse.description,
                        productCategory: createProductResponse.productCategory,
                        additionalComments: createProductResponse.additionalComments,
                        imgUrl: createProductResponse.imgUrl,
                        price: createProductResponse.price,
                        volume: createProductResponse.volume,
                        volumeMeasurementUnit: createProductResponse.volumeMeasurementUnit, 
                        productCode: createProductResponse.productCode,
                        status: createProductResponse.status
                    };

                    res.status(201).location(`/api/products/${newProduct._id}`).json(newProduct);
                }
            } catch (err) {
                next(err)
            }
        }
    } catch (err: any) {
        next(err)
    }
})

router.patch('/:productId', isAuth, isOperatorAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let productId = req.params.productId
    let { title, description,productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status } = req.body;

    let product = { title, description,productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status }

    try {
        let editProductResponse = await productServices.updateOne(productId, product);

        if (editProductResponse) {
            let product = {
                _id: editProductResponse._id,
                title: editProductResponse.title,
                description: editProductResponse.description,
                productCategory: editProductResponse.productCategory,
                additionalComments: editProductResponse.additionalComments,
                imgUrl: editProductResponse.imgUrl,
                price: editProductResponse.price,
                volume: editProductResponse.volume,
                volumeMeasurementUnit: editProductResponse.volumeMeasurementUnit, 
                productCode: editProductResponse.productCode,
                status: editProductResponse.status
            };

            res.json(product);
        } 
    } catch (err: any) {
        next(err)
    }
})

router.delete('/:productId',isAuth, isOperatorAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let productId = req.params.productId

    try {
        let deleteProductResponse = await productServices.deleteOne(productId);

        if (deleteProductResponse) {
            res.json({message: 'Product has successfully been deleted'});
        }
    } catch (err: any) {
        next(err)
    }

})

export default router;