import express, { Response } from "express";

const baseRouter = express.Router()

baseRouter.get('/', (_, res: Response) => {
    res.send('Hello From Sara7a Api!')
})

export default baseRouter