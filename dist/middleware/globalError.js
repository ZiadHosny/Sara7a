import { getFromEnv } from "../utils/getFromEnv.js";
export const globalError = (err, _, res, __) => {
    const { mode } = getFromEnv();
    if (mode == 'dev') {
        devMode(err, res);
    }
    else {
        prodMode(err, res);
    }
};
const prodMode = (err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
};
const devMode = (err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message, stack: err.stack });
};
