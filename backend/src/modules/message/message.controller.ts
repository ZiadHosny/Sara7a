import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { MessageModel } from "../../models/message.model.js";

export const addMessage = catchAsyncError(async (req: Request, res: Response) => {
    
    const { message, userId } = req.body

    await MessageModel.insertMany({ message, userId })

    res.json({ message: 'Added Successfully' })
})

export const allMessage = catchAsyncError(async (req: Request, res: Response) => {

    const { userId } = req.body;

    const messages = await MessageModel.find({ userId }, { message: 1, _id: 0 })

    res.json({ message: 'success', messages })
})