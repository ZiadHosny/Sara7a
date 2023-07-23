import express from "express";
const homeRouter = express.Router();
homeRouter.get('/', (_, res) => {
    res.render('home', { isLoggedIn: false });
});
export default homeRouter;
