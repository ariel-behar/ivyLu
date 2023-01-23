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
import * as clientServices from '../services/clientServices.js';
import * as staffServices from '../services/staffServices.js';
import { AuthenticationError, InvalidDataError } from '../models/Errors.js';
import { isGuest } from '../middlewares/authMiddleware.js';
import generateAuthToken from '../utils/generateAuthToken.js';
const router = Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {
            let filteredClients = yield clientServices.getManyFilteredBy(filters);
            res.json(filteredClients);
        }
        catch (err) {
            next(err);
        }
    }
    else {
        try {
            let clients = yield clientServices.getAll();
            res.json(clients);
        }
        catch (err) {
            next(err);
        }
    }
}));
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, phone, gender, role, password } = req.body;
    try {
        let userExistsResponse;
        //Check if user exists in clients
        userExistsResponse = yield clientServices.getOneByEmail(email);
        if (!userExistsResponse) {
            //Check if user exists in staff
            userExistsResponse = yield staffServices.getOneByEmail(email);
        }
        if (userExistsResponse) {
            next(new InvalidDataError(`Email address "${userExistsResponse.email}" is already taken.`));
        }
        else {
            try {
                let clientRegisterResponse = yield clientServices.register({ firstName, lastName, email, phone, gender, role: Number(role), password });
                if (clientRegisterResponse) {
                    let newClient = {
                        _id: clientRegisterResponse._id,
                        firstName: clientRegisterResponse.firstName,
                        lastName: clientRegisterResponse.lastName,
                        email: clientRegisterResponse.email,
                        phone: clientRegisterResponse.phone,
                        gender: clientRegisterResponse.gender,
                        role: clientRegisterResponse.role,
                    };
                    let authToken = generateAuthToken(newClient);
                    return res.status(201).location(`/api/users/${newClient._id}`).json(Object.assign(Object.assign({}, newClient), { authToken }));
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
router.post('/login', isGuest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                    _id: userLoginResponse._id,
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
                next(new AuthenticationError(`Username or password are incorrect.`));
            }
        }
        else {
            next(new AuthenticationError(`Username or password are incorrect.`));
        }
    }
    catch (err) {
        next(err);
    }
}));
router.patch('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    let updateFields = req.body;
    try {
        if (Object.keys(updateFields).includes('password')) {
            try {
                let hashedPassword = yield bcrypt.hash(updateFields.password, Number(process.env.JWT_SALT));
                updateFields.password = hashedPassword;
            }
            catch (err) {
                if (err.message === 'data and salt arguments required') {
                    next(new Error('An error occurred while attempting to update your password. Please try again'));
                }
                next(new Error(err.message));
            }
        }
        let clientEditResponse = yield clientServices.update(userId, updateFields);
        if (clientEditResponse) {
            let user = {
                _id: clientEditResponse._id,
                firstName: clientEditResponse.firstName,
                lastName: clientEditResponse.lastName,
                email: clientEditResponse.email,
                gender: clientEditResponse.gender,
                phone: clientEditResponse.phone,
                role: clientEditResponse.role,
            };
            return res.json(user);
        }
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    try {
        let deleteClientResponse = yield clientServices.deleteOne(userId);
        if (deleteClientResponse) {
            res.json({ message: 'Client has successfully been deleted' });
        }
    }
    catch (err) {
        next(err);
    }
}));
export default router;
//# sourceMappingURL=clientController.js.map