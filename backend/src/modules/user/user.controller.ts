import { NextFunction, Request, Response } from "express"
import * as bcrypt from 'bcrypt'
import { userModel } from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import { getFromEnv } from "../../utils/getFromEnv.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { sendEmail } from "../../utils/email/sendEmail.js"
import { AppError } from "../../utils/AppError.js"

export const signUp = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body
    const { secretKey, rounds } = getFromEnv()
    const user = await userModel.findOne({ email })
    if (user) {
        next(new AppError("Account Already Exist.", 400))
    } else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            if (err) {
                return res.json({ message: 'error when hashing password', err })
            }
            await userModel.insertMany({ name, email, password: hash })
            const token = jwt.sign({ email }, secretKey)
            sendEmail({ userEmail: email, token, subject: "Verification From Sara7a App" })
            res.json({ message: "Success" })
        })
    }
})

export const signIn = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const { secretKey } = getFromEnv()

    const user = await userModel.findOne({ email })

    if (user) {
        const match = await bcrypt.compare(password, user?.password)

        const { _id: userId, name, emailConfirm } = user

        if (match) {
            const token = jwt.sign({ userId, name, emailConfirm }, secretKey)

            if (emailConfirm) {
                res.json({ message: "Login Ok", token })
            } else {
                next(new AppError("Confirm Your Email First", 400))
            }

        }
        else {
            next(new AppError("Password Incorrect", 400))
        }
    } else {
        next(new AppError("account Not Found", 400))
    }

})

export const emailVerify = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { secretKey } = getFromEnv()

    jwt.verify(token, secretKey, async (err, decoded: any) => {
        if (err) {
            next(new AppError("Email Not found", 500))
        } else {
            const { email } = decoded
            const user = await userModel.findOne({ email })
            if (user) {
                await userModel.findOneAndUpdate({ email }, { emailConfirm: true })
                res.json({ message: "Email Verified" })
            } else {
                res.json({ message: "Email Not found" })
            }
        }
    })
})