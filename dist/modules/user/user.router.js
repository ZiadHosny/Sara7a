import express from "express";
import { emailVerfiy, signIn, register } from "./user.controller.js";
import { userValidation } from "./user.validation.js";
const userRouter = express.Router();
userRouter.post('/register', userValidation, register);
userRouter.post('/signin', signIn);
userRouter.get('/verfiy/:token', emailVerfiy);
export default userRouter;
