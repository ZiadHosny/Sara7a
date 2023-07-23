import bcrypt from 'bcrypt';
import { userModel } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { getFromEnv } from "../../utils/getFromEnv.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { messageModel } from "../../models/message.model.js";
export const login = catchAsyncError(async (req, res, next) => {
    res.render('login', { isLoggedIn: req.session.isLoggedIn });
});
export const register = catchAsyncError(async (req, res, next) => {
    res.render('register', {
        isLoggedIn: req.session.isLoggedIn,
        errors: req.flash('errors'),
        oldInputs: req.flash('oldInputs')
    });
});
export const handleRegister = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const { rounds } = getFromEnv();
    const user = await userModel.findOne({ email });
    if (user) {
        next(new AppError("Account Already Exist.", 400));
    }
    else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            if (err) {
                return res.json({ message: 'error when hashing password', err });
            }
            await userModel.insertMany({ name, email, password: hash });
        });
    }
    res.redirect('/login');
});
export const handleLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user?.password);
        const { _id: userId, name } = user;
        if (match) {
            req.session.userID = userId;
            req.session.name = name;
            req.session.isLoggedIn = true;
            res.redirect('/messages');
        }
        else {
            res.redirect('/login');
        }
    }
    else {
        res.redirect('/login');
    }
});
export const getUser = catchAsyncError(async (req, res) => {
    const userID = req.params.id;
    const user = await userModel.findOne({ _id: userID });
    req.flash('userID', userID);
    if (user) {
        res.render('user', { name: user.name, isLoggedIn: req.session.isLoggedIn });
    }
    else {
        res.send("User Not Found");
    }
});
export const sendMessage = catchAsyncError(async (req, res) => {
    const { message } = req.body;
    const userID = req.flash('userID');
    await messageModel.insertMany({ message, userID });
    res.redirect('/user/' + userID);
});
export const emailVerfiy = catchAsyncError(async (req, res) => {
    const { token } = req.params;
    const { secretKey } = getFromEnv();
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            res.json(err);
        }
        else {
            const { email } = decoded;
            const user = await userModel.findOne({ email });
            if (user) {
                await userModel.findOneAndUpdate({ email }, { emailConfirm: true });
                res.json({ message: "Email Verfiyed" });
            }
            else {
                res.json({ message: "Email Not found" });
            }
        }
    });
});
