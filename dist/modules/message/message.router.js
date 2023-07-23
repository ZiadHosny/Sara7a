import express from "express";
import { allMessage } from "./message.controller.js";
const messageRouter = express.Router();
messageRouter.get('/', allMessage);
export default messageRouter;
