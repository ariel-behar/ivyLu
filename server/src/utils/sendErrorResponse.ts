import { Request, Response} from 'express'
import * as env from 'dotenv'
env.config()

export const sendErrorResponse = function (req: Request, res: Response, status = 500, message: string, err: object | undefined | null = null) {
    if (process.env.NODE_ENV === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}