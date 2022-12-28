const router = require('express').Router();

const productServices = require('../services/productServices')

// router.get('/', async (req, res) => {
//     try {
//         let services = await serviceServices.getAll();

//         res.json(services)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// router.get('/:serviceId', async (req, res) => {
//     let serviceId = req.params.serviceId;

//     try {
//         let service = await serviceServices.getOne(serviceId);

//         res.json(service)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

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
                        duration: createProductResponse.duration
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

// router.post('/:serviceId/edit', async (req, res) => {
//     let serviceId = req.params.serviceId
//     let { title, description, additionalComments, imgUrl, price, duration, status } = req.body;

//     let service = { title, description, additionalComments, imgUrl, price, duration, status }

//     try {
//         let editServiceResponse = await serviceServices.updateOne(serviceId, service);

//         if (editServiceResponse) {
//             let service = {
//                 serviceId: editServiceResponse._id,
//                 title: editServiceResponse.title,
//                 description: editServiceResponse.description,
//                 additionalComments: editServiceResponse.additionalComments,
//                 imgUrl: editServiceResponse.imgUrl,
//                 price: editServiceResponse.price,
//                 duration: editServiceResponse.duration
//             };

//             res.json(service);
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }

// })

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