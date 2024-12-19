import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../Error/AppEror"
import config from '../config';
import { UserModel } from '../Modules/Authentication/authentication.model';

const auth=(...roles:string[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        // <- get proper token -> 
        const token=req.headers.authorization?.split(' ')[1]
        if(!token){
            throw new AppError(401,"Authorization token missing");
            
        }
        const decoded=jwt.verify(token,config.jwt_access_secret as string) as JwtPayload

        if(!decoded){
            throw new AppError(401, "invalid token");
            
        }

        const {role,email}=decoded
        // <- check this user exist in database

        const isExists = await UserModel.findOne({ email: email })
        if (!isExists) {
            throw new AppError(404, "This User Not Found");

        }
        // <- this user is Blocked ->
        if (isExists.isBlocked) {
            throw new AppError(403, "This User is blocked");
        }

        if(!roles.includes(isExists?.role)){
            throw new AppError(
                401,
                'You are not authorized . please logIn again',
            );
        }


        if (role && roles.length && !roles.includes(role)){
            throw new AppError(
                401,
                'You are not authorized  . please logIn again',
            );
        }

        req.user=decoded


        next()

    


    })
}



export default auth