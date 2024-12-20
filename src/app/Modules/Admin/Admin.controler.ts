import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./Admin.services";

const blockUser = catchAsync(async (req: Request, res: Response) => {
    await adminServices.blockUserFromDB(req.params?.userId)

    res.status(200).json({
        success: true,
        message: "User blocked successfully",
        statusCode: 200
    })
})

const deleteBlog=catchAsync(async(req:Request,res:Response)=>{
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200
    })
})



export const adminController = {
    blockUser,
    deleteBlog
}