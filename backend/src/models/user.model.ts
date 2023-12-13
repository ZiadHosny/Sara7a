import { Schema, model } from "mongoose";
import { User } from "../utils/types.js";

const userSchema = new Schema<User>({
    name: String,
    email: String,
    password: String,
    emailConfirm: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

export const userModel = model('user', userSchema)