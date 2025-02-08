import catchAsync from "../../utils/catchAsync";
import { messageService } from "./message.service";

const createMessage=catchAsync(async(req,res)=>{
    const result = await messageService.createMessage(req.body)

    res.status(201).json({
        success: true,
        message: "Message send successfully",
        statusCode: 201,
        data: result
    })
})
const getAllMessage=catchAsync(async(req,res)=>{
    const result = await messageService.getAllMessage()

    res.status(201).json({
        success: true,
        message: "Message send successfully",
        statusCode: 201,
        data: result
    })
})


export const messageController= {
    createMessage,
    getAllMessage
}