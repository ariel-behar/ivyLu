import {Router, Request, Response, NextFunction} from 'express'

import * as serviceServices from '../services/serviceServices.js'

import { InvalidDataError } from '../models/Errors.js';
import { IServiceCreate } from '../models/Service.js';

import { isAuth, isOperatorAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let services = await serviceServices.getAll();

        res.json(services)
    } catch (err: any) {
        next(err)
    }
})

router.get('/:serviceId', async (req: Request, res: Response, next: NextFunction) => {
    let serviceId = req.params.serviceId;

    try {
        let service = await serviceServices.getOne(serviceId);

        res.json(service)
    } catch (err: any) {
        next(err)
    }
})

router.post('/create', isAuth, isOperatorAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let { title, description, additionalComments, imgUrl, price, duration, status, creatorId } = req.body;

    try {
        let serviceExists = await serviceServices.getOneByTitle(title);

        if (serviceExists) {
            next(new InvalidDataError(`A service with title "${title}" already exists`))
        } else {
            try {
                let createServiceResponse = await serviceServices.create({ title, description, additionalComments, imgUrl, price, duration, status, creatorId });

                if (createServiceResponse) {
                    let newService = {
                        _id: createServiceResponse._id,
                        title: createServiceResponse.title,
                        description: createServiceResponse.description,
                        additionalComments: createServiceResponse.additionalComments,
                        imgUrl: createServiceResponse.imgUrl,
                        price: createServiceResponse.price,
                        duration: createServiceResponse.duration
                    };

                    res.status(201).location(`/api/services/${newService._id}`).json(newService);
                }
            } catch (err: any) {
                next(err)
            }
        }
    } catch (err: any) {
        next(err)
    }
})

router.post('/:serviceId/edit',isAuth, isOperatorAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let serviceId = req.params.serviceId
    let { title, description, additionalComments, imgUrl, price, duration, status } = req.body;

    let service: Omit<IServiceCreate, "creatorId"> = { title, description, additionalComments, imgUrl, price, duration, status }

    try {
        let editServiceResponse = await serviceServices.updateOne(serviceId, service);

        if (editServiceResponse) {
            let service = {
                _id: editServiceResponse._id,
                title: editServiceResponse.title,
                description: editServiceResponse.description,
                additionalComments: editServiceResponse.additionalComments,
                imgUrl: editServiceResponse.imgUrl,
                price: editServiceResponse.price,
                duration: editServiceResponse.duration
            };

            res.json(service);
        } 
    } catch (err: any) {
        next(err)
    }

})

router.get('/:serviceId/delete',isAuth, isOperatorAdmin, async (req: Request, res: Response, next: NextFunction) => {
    let serviceId = req.params.serviceId

    try {
        let deleteServiceResponse = await serviceServices.deleteOne(serviceId);

        if (deleteServiceResponse) {
            res.json({message: 'Service record has successfully been deleted'});
        }
    } catch (err: any) {
        next(err)
    }

})

export default router;