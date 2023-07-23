import express, { Response } from "express";

const homeRouter = express.Router()

homeRouter.get('/', (_, res: Response) => {
    res.render('home', { isLoggedIn: false})
})

export default homeRouter