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
import * as serviceServices from '../services/serviceServices.js';
import { InvalidDataError } from '../models/Errors.js';
import { isAuth, isOperatorAdmin } from '../middlewares/authMiddleware.js';
const router = Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let services = yield serviceServices.getAll();
        res.json(services);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:serviceId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let serviceId = req.params.serviceId;
    try {
        let service = yield serviceServices.getOne(serviceId);
        res.json(service);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/create', isAuth, isOperatorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, additionalComments, imgUrl, price, duration, status, creatorId } = req.body;
    try {
        let serviceExists = yield serviceServices.getOneByTitle(title);
        if (serviceExists) {
            next(new InvalidDataError(`A service with title "${title}" already exists`));
        }
        else {
            try {
                let createServiceResponse = yield serviceServices.create({ title, description, additionalComments, imgUrl, price, duration, status, creatorId });
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
            }
            catch (err) {
                next(err);
            }
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/:serviceId/edit', isAuth, isOperatorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let serviceId = req.params.serviceId;
    let { title, description, additionalComments, imgUrl, price, duration, status } = req.body;
    let service = { title, description, additionalComments, imgUrl, price, duration, status };
    try {
        let editServiceResponse = yield serviceServices.updateOne(serviceId, service);
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
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:serviceId/delete', isAuth, isOperatorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let serviceId = req.params.serviceId;
    try {
        let deleteServiceResponse = yield serviceServices.deleteOne(serviceId);
        if (deleteServiceResponse) {
            res.json({ message: 'Service record has successfully been deleted' });
        }
    }
    catch (err) {
        next(err);
    }
}));
export default router;
//# sourceMappingURL=serviceController.js.map