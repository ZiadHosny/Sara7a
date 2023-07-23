import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

const invaildRouter = express.Router()

invaildRouter.get('/', (req: Request, _: Response, next: NextFunction) => {
    next(new AppError("Invaild Url - can't access this End Point " + req.originalUrl, 404))
})

export default invaildRouter