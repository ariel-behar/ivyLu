import { Request, Response} from 'express'

export const sendErrorResponse = function (req: Request, res: Response, status = 500, message: string, err: object | undefined | null = null) {
    if (req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}