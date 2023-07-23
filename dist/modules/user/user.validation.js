import Joi from "joi";
import { logErrInfoMsg } from "../../utils/console/log.js";
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
export const userValidation = (req, res, next) => {
    const { name, email, password } = req.body;
    const { error } = userSchema.validate({ name, email, password }, { abortEarly: false });
    if (error) {
        const errorMsgArray = [];
        error.details.forEach((err) => {
            errorMsgArray.push({ path: err.path, message: err.message });
        });
        logErrInfoMsg(errorMsgArray);
        req.flash('errors', errorMsgArray);
        req.flash('oldInputs', req.body);
        res.redirect('/register');
    }
    else {
        next();
    }
};
