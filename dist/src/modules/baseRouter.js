import * as express from "express";
const baseRouter = express.Router();
baseRouter.get('/', (_, res) => {
    res.send('Hello From Sara7a Api!');
});
export default baseRouter;
