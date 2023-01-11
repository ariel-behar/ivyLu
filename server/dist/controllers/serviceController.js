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
import { isAuth, isOperatorAdmin } from '../middlewares/authMiddleware.js';
import * as serviceServices from '../services/serviceServices.js';
const router = Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let services = yield serviceServices.getAll();
        res.json(services);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get('/:serviceId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let serviceId = req.params.serviceId;
    try {
        let service = yield serviceServices.getOne(serviceId);
        res.json(service);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/create', isAuth, isOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, additionalComments, imgUrl, price, duration, status, creatorId } = req.body;
    try {
        let serviceExists = yield serviceServices.getOneByTitle(title);
        if (serviceExists) {
            throw { statusCode: 403, message: "A service with this Title already exists" };
        }
        else {
            try {
                let createServiceResponse = yield serviceServices.create({ title, description, additionalComments, imgUrl, price, duration, status, creatorId });
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
            }
            catch (err) {
                res.status(400).send(err);
            }
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
router.post('/:serviceId/edit', isAuth, isOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let serviceId = req.params.serviceId;
    let { title, description, additionalComments, imgUrl, price, duration, status } = req.body;
    let service = { title, description, additionalComments, imgUrl, price, duration, status };
    try {
        let editServiceResponse = yield serviceServices.updateOne(serviceId, service);
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
        else {
            throw { statusCode: 401, message: 'Bad request' };
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
router.get('/:serviceId/delete', isAuth, isOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let serviceId = req.params.serviceId;
    try {
        let deleteServiceResponse = yield serviceServices.deleteOne(serviceId);
        if (deleteServiceResponse) {
            res.json({ message: 'Record has successfully been deleted' });
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
export default router;
//# sourceMappingURL=serviceController.js.map