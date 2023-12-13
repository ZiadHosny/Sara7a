const mode = 'prod';
export const globalError = (err, _, res, __) => {
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
