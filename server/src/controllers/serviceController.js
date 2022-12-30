import {Router} from 'express'
import * as serviceServices from '../services/serviceServices.js'

const router = Router();

router.get('/', async (req, res) => {
    try {
        let services = await serviceServices.getAll();

        res.json(services)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:serviceId', async (req, res) => {
    let serviceId = req.params.serviceId;

    try {
        let service = await serviceServices.getOne(serviceId);

        res.json(service)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/create', async (req, res) => {
    let { title, description, additionalComments, imgUrl, price, duration, status, creatorId } = req.body;

    try {
        let serviceExists = await serviceServices.getOneByTitle(title);

        if (serviceExists) {
            throw res.status(500).json({ message: "A service with this Title already exists" })
        } else {
            try {
                let createServiceResponse = await serviceServices.create({ title, description, additionalComments, imgUrl, price, duration, status, creatorId });

                if (createServiceResponse) {
                    let service = {
                        serviceId: createServiceResponse._id,
                        title: createServiceResponse.title,
                        description: createServiceResponse.description,
                        additionalComments: createServiceResponse.additionalComments,
                        imgUrl: createServiceResponse.imgUrl,
                        price: createServiceResponse.price,
                        duration: createServiceResponse.duration
                    };

                    res.json(service);
                }
            } catch (err) {
                res.status(500).json(err)
            }
        }
    } catch (err) {
        res.json(err.message)
    }
})

router.post('/:serviceId/edit', async (req, res) => {
    let serviceId = req.params.serviceId
    let { title, description, additionalComments, imgUrl, price, duration, status } = req.body;

    let service = { title, description, additionalComments, imgUrl, price, duration, status }

    try {
        let editServiceResponse = await serviceServices.updateOne(serviceId, service);

        if (editServiceResponse) {
            let service = {
                serviceId: editServiceResponse._id,
                title: editServiceResponse.title,
                description: editServiceResponse.description,
                additionalComments: editServiceResponse.additionalComments,
                imgUrl: editServiceResponse.imgUrl,
                price: editServiceResponse.price,
                duration: editServiceResponse.duration
            };

            res.json(service);
        }
    } catch (err) {
        res.status(500).json(err)
    }

})

router.get('/:serviceId/delete', async (req, res) => {
    let serviceId = req.params.serviceId

    try {
        let deleteServiceResponse = await serviceServices.deleteOne(serviceId);

        if (deleteServiceResponse) {
            res.json({message: 'Record successfully deleted'});
        }
    } catch (err) {
        res.status(500).json(err)
    }

})

export default router;