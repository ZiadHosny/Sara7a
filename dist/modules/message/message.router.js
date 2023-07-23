import express from "express";
import { addMessage, allMessage } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";
const messageRouter = express.Router();
messageRouter.post('/', auth, addMessage);
messageRouter.get('/', auth, allMessage);
messageRouter.get;
export default messageRouter;
