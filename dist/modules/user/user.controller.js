import bcrypt from 'bcrypt';
import { userModel } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { getFromEnv } from "../../utils/getFromEnv.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { sendEmail } from "../../utils/email/sendEmail.js";
import { AppError } from "../../utils/AppError.js";
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, age } = req.body;
    const { secretKey, rounds } = getFromEnv();
    const user = await userModel.findOne({ email });
    if (user) {
        next(new AppError("Account Already Exist.", 400));
    }
    else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            if (err) {
                return res.json({ message: 'error when hashing password', err });
            }
            await userModel.insertMany({ name, email, password: hash, age });
            const token = jwt.sign({ email }, secretKey);
            sendEmail({ userEmail: email, token, subject: "Verification From Sara7a App" });
            res.json({ message: "Success" });
        });
    }
});
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const { secretKey } = getFromEnv();
    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user?.password);
        const { _id: userId, name, emailConfirm } = user;
        if (match) {
            const token = jwt.sign({ userId, name, emailConfirm }, secretKey);
            if (emailConfirm) {
                res.json({ message: "Login Ok", token });
            }
            else {
                res.json({ message: 'Confirm Your Email First' });
            }
        }
        else {
            res.json({ message: 'Password Incorrect' });
        }
    }
    else {
        res.json({ message: "account Not Found" });
    }
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
