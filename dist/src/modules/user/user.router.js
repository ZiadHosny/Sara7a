import * as express from "express";
import { emailVerify, signIn, signUp } from "./user.controller.js";
import { userValidation } from "../../middleware/validation/user.validation.js";
const userRouter = express.Router();
userRouter.post('/signup', userValidation, signUp);
userRouter.post('/signIn', signIn);
userRouter.get('/verify/:token', emailVerify);
export default userRouter;
