import jwt from 'jsonwebtoken'
import * as env from 'dotenv'
env.config()

export const isAuth = function (req, res, next) {
    let userAuthToken = req.headers['auth-token']

    if (!userAuthToken) {
        return res.status(401).json({ message: 'A problem occurred during User authentication' })
    }
    
    try {
        jwt.verify(userAuthToken, process.env.AUTH_TOKEN_SECRET, function (err, decodedToken) {
            if (err) {
                throw { message: 'A problem occurred during User authentication' };
            } else {
                res.locals.user = decodedToken;
                req.user = decodedToken;

                next();
            }
        })
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

export const isAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    
    if(userRole === 4) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized request' })
    }
}

export const isOperatorAdmin = function (req, res, next) {
    let userRole = res.locals.user.role;
    
    if(userRole === 4 || userRole === 3) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized request' })
    }
}

export const isClient = function (req, res, next) {
    let userRole = res.locals.user.role;
    
    if(userRole === 1) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized request' })
    }
}

export const isGuest = function (req, res, next) {
    let userAuthToken = req.headers['auth-token']

    if (!userAuthToken) {
        return next()
    }

    return res.status(401).json({ message: 'You need to log out in order to be able to log in.' })
}