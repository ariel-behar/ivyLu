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
import bcrypt from 'bcrypt';
import * as staffServices from '../services/staffServices.js';
import * as clientServices from '../services/clientServices.js';
import generateAuthToken from '../utils/generateAuthToken.js';
import { isAuth, isAdmin, isGuest } from '../middlewares/authMiddleware.js';
const router = Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {
            let users = yield staffServices.getManyFilteredBy(filters);
            res.json(users);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    else {
        try {
            let users = yield staffServices.getAll();
            res.json(users);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
}));
router.post('/register', isAuth, isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, phone, gender, password, role, about, imgUrl } = req.body;
    try {
        let userExistsResponse;
        //Check clients
        userExistsResponse = yield clientServices.getOneByEmail(email);
        if (!userExistsResponse) {
            // Check staff
            userExistsResponse = yield staffServices.getOneByEmail(email);
        }
        if (userExistsResponse) {
            throw { statusCode: 403, message: "This email address is already being used by another user." };
        }
        else {
            try {
                let userResponse;
                if (role == 2) {
                    userResponse = yield staffServices.register({ firstName, lastName, email, phone, gender, password, role, imgUrl, about });
                }
                else {
                    userResponse = yield staffServices.register({ firstName, lastName, email, phone, gender, password, role });
                }
                if (userResponse) {
                    let user = {
                        userId: userResponse._id,
                        firstName: userResponse.firstName,
                        lastName: userResponse.lastName,
                        email: userResponse.email,
                        gender: userResponse.gender,
                        phone: userResponse.phone,
                        role: userResponse.role,
                        imgUrl: userResponse.imgUrl
                    };
                    let authToken = generateAuthToken(user);
                    return res.json(Object.assign(Object.assign({}, user), { authToken }));
                }
            }
            catch (err) {
                res.status(400).send(err);
            }
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/login', isGuest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let userLoginResponse;
        //Check clients
        userLoginResponse = yield clientServices.login(email);
        if (!userLoginResponse) {
            // Check staff
            userLoginResponse = yield staffServices.login(email);
        }
        if (userLoginResponse) {
            let isValidPassword = yield bcrypt.compare(password, userLoginResponse.password);
            if (isValidPassword) {
                let user = {
                    userId: userLoginResponse._id,
                    firstName: userLoginResponse.firstName,
                    lastName: userLoginResponse.lastName,
                    email: userLoginResponse.email,
                    gender: userLoginResponse.gender,
                    phone: userLoginResponse.phone,
                    role: userLoginResponse.role,
                    imgUrl: userLoginResponse.imgUrl
                };
                let authToken = generateAuthToken(user);
                return res.json(Object.assign(Object.assign({}, user), { authToken }));
            }
            else {
                throw { statusCode: 401, message: 'Username or password are incorrect.' };
            }
        }
        else {
            throw { statusCode: 401, message: 'Username or password are incorrect.' };
        }
    }
    catch (err) {
        if (err.hasOwnProperty('statusCode')) {
            res.status(err.statusCode).send(err);
        }
        else {
            res.status(400).send(err);
        }
    }
}));
router.get('/:userId/delete', isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    try {
        let deleteUserResponse = yield staffServices.deleteOne(userId);
        if (deleteUserResponse) {
            res.json({ message: 'Record has successfully been deleted' });
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
export default router;
//# sourceMappingURL=staffController.js.map