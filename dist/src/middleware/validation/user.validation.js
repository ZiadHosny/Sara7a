import Joi from "joi";
import { logErrInfoMsg } from "../../utils/console/log.js";
import { AppError } from "../../utils/AppError.js";
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    rePassword: Joi.ref('password'),
});
export const userValidation = (req, res, next) => {
    const { name, email, password, rePassword } = req.body;
    const errorMsgArray = [];
    const { error } = userSchema.validate({ name, email, password, rePassword }, { abortEarly: false });
    if (error) {
        error.details.map((err) => {
            errorMsgArray.push(err.message);
        });
        logErrInfoMsg(errorMsgArray);
        next(new AppError(errorMsgArray[0], 400));
    }
    else {
        next();
    }
};
