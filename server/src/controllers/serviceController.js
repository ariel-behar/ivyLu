import {Router} from 'express'
import { isAuth, isOperatorAdmin } from '../middlewares/authMiddleware.js';

import * as serviceServices from '../services/serviceServices.js'

const router = Router();

router.get('/', async (req, res) => {
    try {
        let services = await serviceServices.getAll();

        res.json(services)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/:serviceId', async (req, res) => {
    let serviceId = req.params.serviceId;

    try {
        let service = await serviceServices.getOne(serviceId);

        res.json(service)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/create', isAuth, isOperatorAdmin, async (req, res) => {
    let { title, description, additionalComments, imgUrl, price, duration, status, creatorId } = req.body;

    try {
        let serviceExists = await serviceServices.getOneByTitle(title);

        if (serviceExists) {
            throw {statusCode: 403, message: "A service with this Title already exists" }
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
                res.status(400).send(err)
            }
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }
})

router.post('/:serviceId/edit',isAuth, isOperatorAdmin, async (req, res) => {
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
        } else {
            throw {statusCode: 401, message: 'Bad request'}
        }

    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }

})

router.get('/:serviceId/delete',isAuth, isOperatorAdmin, async (req, res) => {
    let serviceId = req.params.serviceId

    try {
        let deleteServiceResponse = await serviceServices.deleteOne(serviceId);

        if (deleteServiceResponse) {
            res.json({message: 'Record has successfully been deleted'});
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }

})

export default router;