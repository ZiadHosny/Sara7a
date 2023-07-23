import express from "express";
import { emailVerfiy, register, login, handleRegister, handleLogin, getUser, sendMessage } from "./user.controller.js";
import { userValidation } from "./user.validation.js";

const userRouter = express.Router()

userRouter.get('/register', register)
userRouter.get('/login', login)
userRouter.post('/handleRegister', userValidation, handleRegister)
userRouter.post('/handleLogin', handleLogin)
userRouter.get('/user/:id', getUser)
userRouter.post('/handleMessages', sendMessage)
userRouter.get('/verfiy/:token', emailVerfiy)
userRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
});

export default userRouter