import express from "express";
import { AppError } from "../utils/AppError.js";
const invaildRouter = express.Router();
invaildRouter.get('/', (req, _, next) => {
    next(new AppError("Invaild Url - can't access this End Point " + req.originalUrl, 404));
});
export default invaildRouter;
