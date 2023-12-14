import { getFromEnv } from "../utils/getFromEnv.js";
export const globalError = (err, _, res, __) => {
    const { mode } = getFromEnv();
    if (mode == 'prod') {
        prodMode(err, res);
    }
    else {
        devMode(err, res);
    }
};
const prodMode = (err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message });
};
const devMode = (err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message, stack: err.stack });
};
