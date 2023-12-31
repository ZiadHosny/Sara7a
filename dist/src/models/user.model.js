import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    emailConfirm: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
export const userModel = model('user', userSchema);
