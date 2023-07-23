import Joi from "joi";
import { logErrInfoMsg } from "../../utils/console/log.js";
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(12).max(70),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    repassword: Joi.ref('password'),
});
export const userValidation = (req, res, next) => {
    const { name, email, age, password, repassword } = req.body;
    const errorMsgArray = [];
    const { error } = userSchema.validate({ name, email, age, password, repassword }, { abortEarly: false });
    if (error) {
        error.details.map((err) => {
            errorMsgArray.push(err.message);
        });
        logErrInfoMsg(errorMsgArray);
        res.json(errorMsgArray);
    }
    else {
        next();
    }
};
