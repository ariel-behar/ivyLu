import jwt from 'jsonwebtoken';
import * as env from 'dotenv';
import { sendErrorResponse } from '../utils/sendErrorResponse.js';
env.config();
export const isAuth = function (req, res, next) {
    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        next({ status: 401, message: `Unauthorized request` });
        return;
    }
    else {
        let authTokenBearer = tokenHeader.split(' ')[0];
        let authToken = tokenHeader.split(' ')[1];
        if (!authToken || authTokenBearer !== 'Bearer') {
            next({ status: 401, message: 'No valid access token has been provided' });
        }
        else {
            try {
                jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET, function (err, decodedToken) {
                    if (err) {
                        next({ status: 401, message: 'Access token is invalid' });
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
        }
    }
};
export const isGuest = function (req, res, next) {
    let tokenHeader = req.headers['authorization'];
    let authToken = tokenHeader === null || tokenHeader === void 0 ? void 0 : tokenHeader.split(' ')[1];
    if (!authToken) {
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
        next({ status: 403, message: 'Forbidden request.' });
    }
};
export const isHairdresserOperatorAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 2 || userRole === 3 || userRole === 4) {
        next();
    }
    else {
        next({ status: 403, message: 'Forbidden request.' });
    }
};
export const isOperatorAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 3 || userRole === 4) {
        next();
    }
    else {
        next({ status: 403, message: 'Forbidden request.' });
    }
};
export const isAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    if (userRole === 4) {
        next();
    }
    else {
        next({ status: 403, message: 'Forbidden request.' });
    }
};
//# sourceMappingURL=authMiddleware.js.map