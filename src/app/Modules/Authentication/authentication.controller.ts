import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authenticationServices } from "./authentication.services";

const registerUser=catchAsync(async(req:Request,res:Response)=>{
    const result= await authenticationServices.registerUserInDB(req?.body)
    res.status(201).json({
        success:true,
        message: "User registered successfully",
        "statusCode": 201,
        data:{
            _id : result?._id,
            name:result?.name,
            email:result?.email
        }
    })
})




export const authenticationController={
    registerUser
}