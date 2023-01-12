import jwt from 'jsonwebtoken';
import * as env from 'dotenv';
import { sendErrorResponse } from '../utils/sendErrorResponse.js';
env.config();
export const isAuth = function (req, res, next) {
    let userAuthToken = req.headers['auth-token'];
    if (!userAuthToken) {
        next({ status: 401, message: 'Unauthorized request.' });
    }
    try {
        jwt.verify(userAuthToken, process.env.AUTH_TOKEN_SECRET, function (err, decodedToken) {
            if (err) {
                next({ status: 401, message: 'A problem occurred during User authentication' });
            }
            else {
                res.locals.user = decodedToken;
                next();
            }
        });
    }
    catch (err) {
        sendErrorResponse(req, res, 401, err.message, err);
    }
};
export const isGuest = function (req, res, next) {
    let userAuthToken = req.headers['auth-token'];
    if (!userAuthToken) {
        return next();
    }
    next({ status: 403, message: 'You need to log out in order to be able to log in.' });
};
export const isClient = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 1) {
        next();
    }
    else {
        next({ status: 401, message: 'Unauthorized request.' });
    }
};
export const isHairdresserOperatorAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 2 || userRole === 3 || userRole === 4) {
        next();
    }
    else {
        next({ status: 401, message: 'Unauthorized request.' });
    }
};
export const isOperatorAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 3 || userRole === 4) {
        next();
    }
    else {
        next({ status: 401, message: 'Unauthorized request.' });
    }
};
export const isAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 4) {
        next();
    }
    else {
        next({ status: 401, message: 'Unauthorized request.' });
    }
};
//# sourceMappingURL=authMiddleware.js.map