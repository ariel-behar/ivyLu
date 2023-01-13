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
import { AuthenticationError, InvalidDataError } from '../models/Errors.js';
import { isAuth, isAdmin, isGuest } from '../middlewares/authMiddleware.js';
import generateAuthToken from '../utils/generateAuthToken.js';
const router = Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.entries(req.query).length > 0) {
        let filters = req.query;
        try {
            let filteredStaffMembers = yield staffServices.getManyFilteredBy(filters);
            res.json(filteredStaffMembers);
        }
        catch (err) {
            next(err);
        }
    }
    else {
        try {
            let staffMembers = yield staffServices.getAll();
            res.json(staffMembers);
        }
        catch (err) {
            next(err);
        }
    }
}));
router.get('/:userId', isAuth, isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    try {
        let staffMember = yield staffServices.getOne(userId);
        res.json(staffMember);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/register', isAuth, isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, phone, gender, password, role, about, imgUrl } = req.body;
    try {
        let userExistsResponse;
        //Check if user exists in clients
        userExistsResponse = yield clientServices.getOneByEmail(email);
        if (!userExistsResponse) {
            // Check if user exits in staff
            userExistsResponse = yield staffServices.getOneByEmail(email);
        }
        if (userExistsResponse) {
            next(new InvalidDataError(`Email address "${userExistsResponse.email}" is already taken.`));
        }
        else {
            try {
                let staffRegisterResponse;
                if (role == 2) {
                    staffRegisterResponse = yield staffServices.register({ firstName, lastName, email, phone, gender, password, role, imgUrl, about });
                }
                else {
                    staffRegisterResponse = yield staffServices.register({ firstName, lastName, email, phone, gender, password, role });
                }
                if (staffRegisterResponse) {
                    let user = {
                        userId: staffRegisterResponse._id,
                        firstName: staffRegisterResponse.firstName,
                        lastName: staffRegisterResponse.lastName,
                        email: staffRegisterResponse.email,
                        gender: staffRegisterResponse.gender,
                        phone: staffRegisterResponse.phone,
                        role: staffRegisterResponse.role,
                        imgUrl: staffRegisterResponse.imgUrl
                    };
                    let authToken = generateAuthToken(user);
                    return res.json(Object.assign(Object.assign({}, user), { authToken }));
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
router.post('/:userId/edit', isAuth, isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    let { firstName, lastName, email, phone, gender, password, role, about, imgUrl } = req.body;
    try {
        let staffEditResponse;
        if (role == 2) {
            staffEditResponse = yield staffServices.update(userId, { firstName, lastName, email, phone, gender, password, role, imgUrl, about, });
        }
        else {
            staffEditResponse = yield staffServices.update(userId, { firstName, lastName, email, phone, gender, password, role });
        }
        if (staffEditResponse) {
            let user = {
                userId: staffEditResponse._id,
                firstName: staffEditResponse.firstName,
                lastName: staffEditResponse.lastName,
                email: staffEditResponse.email,
                gender: staffEditResponse.gender,
                phone: staffEditResponse.phone,
                role: staffEditResponse.role,
                imgUrl: staffEditResponse.imgUrl
            };
            return res.json(user);
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:userId/delete', isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    try {
        let deleteUserResponse = yield staffServices.deleteOne(userId);
        if (deleteUserResponse) {
            res.json({ message: 'Staff member has successfully been deleted' });
        }
    }
    catch (err) {
        next(err);
    }
}));
export default router;
//# sourceMappingURL=staffController.js.map