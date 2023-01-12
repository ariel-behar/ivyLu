import * as env from 'dotenv';
env.config();
export const sendErrorResponse = function (req, res, status = 500, message, err = null) {
    if (process.env.NODE_ENV === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    });
};
//# sourceMappingURL=sendErrorResponse.js.map