import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authenticationServices } from "./authentication.services";
import config from "../../config";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const result = await authenticationServices.registerUserInDB(req?.body)
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        "statusCode": 201,
        data: {
            _id: result?._id,
            name: result?.name,
            email: result?.email
        }
    })
})

const logInUser = catchAsync(async (req:Request, res:Response) => {
    const result = await authenticationServices.logInUser(req?.body)

    res.cookie('token', result.token, {
        secure: config.node_env === 'production',
        httpOnly: true,
        sameSite: config.node_env === 'production' ? "none" : 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });


    res.status(200).json({
        success: true,
        message: "Login successful",
        statusCode: 200,
        data: result
    })
})



export const authenticationController = {
    registerUser,
    logInUser
}