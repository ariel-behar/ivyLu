import jwt from 'jsonwebtoken'
import * as env from 'dotenv'
env.config()


exports.isLoggedIn = function (req, res, next) {
    let userAuthToken = req.headers['auth-token']

    if (!userAuthToken) { 
        return next();
    }

    try {
        jwt.verify(userAuthToken, process.env.AUTH_TOKEN_SECRET, function(err, decodedToken){
            if (err) {
                throw err;
            } else {
                res.locals.user = decodedToken;
                req.user = decodedToken;

                next();
            }
        })
    } catch (error) {
        console.log('My error', error)
        res.status(401).json({ code: 401, message: 'A problem occurred during User authentication' });
    }
}
