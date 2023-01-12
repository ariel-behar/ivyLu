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
import * as productServices from '../services/productServices.js';
const router = Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield productServices.getAll();
        res.json(products);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get('/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productId = req.params.productId;
    try {
        let product = yield productServices.getOne(productId);
        res.json(product);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/create', isAuth, isOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId } = req.body;
    try {
        let productExists = yield productServices.getOneByTitle(title);
        if (productExists) {
            throw { statusCode: 403, message: "A product with this Title already exists" };
        }
        else {
            try {
                let createProductResponse = yield productServices.create({ title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status, creatorId });
                if (createProductResponse) {
                    let product = {
                        productId: createProductResponse._id,
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
                    res.json(product);
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
router.post('/:productId/edit', isAuth, isOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productId = req.params.productId;
    let { title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status } = req.body;
    let product = { title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status };
    try {
        let editProductResponse = yield productServices.updateOne(productId, product);
        if (editProductResponse) {
            let product = {
                productId: editProductResponse._id,
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
        else {
            throw { statusCode: 401, message: 'Bad request' };
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
router.get('/:productId/delete', isAuth, isOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productId = req.params.productId;
    try {
        let deleteProductResponse = yield productServices.deleteOne(productId);
        if (deleteProductResponse) {
            res.json({ message: 'Record has successfully been deleted' });
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
export default router;
//# sourceMappingURL=productController.js.map