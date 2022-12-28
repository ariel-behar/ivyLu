const router = require('express').Router();

const productServices = require('../services/productServices')

router.get('/', async (req, res) => {
    try {
        let products = await productServices.getAll();

        res.json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:productId', async (req, res) => {
    let productId = req.params.productId;
    console.log('productId:', productId)

    try {
        let product = await productServices.getOne(productId);

        res.json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/create', async (req, res) => {
    let { title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId } = req.body;

    try {
        let productExists = await productServices.getOneByTitle(title);

        if (productExists) {
            throw res.status(500).json({ message: "A product with this Title already exists" })
        } else {
            try {
                let createProductResponse = await productServices.create({ title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId });
                console.log('createProductResponse:', createProductResponse)

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
                console.log('err:', err)

                res.status(500).json(err.message)
            }
        }
    } catch (err) {
        console.log(err.message);
        res.json(err.message)
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
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// router.get('/:serviceId/delete', async (req, res) => {
//     let serviceId = req.params.serviceId

//     try {
//         let deleteServiceResponse = await serviceServices.deleteOne(serviceId);

//         if (deleteServiceResponse) {
//             res.json({message: 'Record successfully deleted'});
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }

// })





module.exports = router;