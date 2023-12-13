import { NextFunction, Request, Response } from "express"

const mode = 'prod'

export const globalError = (err: any, _: Request, res: Response, __: NextFunction) => {
    if (mode == 'prod') {
        prodMode(err, res)
    } else {
        devMode(err, res)
    }
}

const prodMode = (err: any, res: Response) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ error: err.message })
}

const devMode = (err: any, res: Response) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ error: err.message, stack: err.stack })
}
