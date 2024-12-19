import config from "../../config";
import AppError from "../../Error/AppEror";
import { TLogIn, TRegister } from "./authentication.interface";
import { UserModel } from "./authentication.model";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const registerUserInDB = async (payload: TRegister) => {

    // <- hash Password ->
    payload.password = await bcrypt.hash(payload.password, Number(config.salt_round))
    //<- save to DB ->
    const result = await UserModel.create(payload)
    return result
}


const logInUser = async (payload: TLogIn) => {
    // <- check this user exist in database

    const isExists = await UserModel.findOne({ email: payload?.email })
    if (!isExists) {
        throw new AppError(404, "This User Not Found");

    }
    // <- this user is Blocked ->
    if (isExists.isBlocked) {
        throw new AppError(403, "This User is blocked");
    }
    // <- check the  password ok or not ->
    const isPassIsOk = await bcrypt.compare(payload?.password, isExists?.password)

    if (!isPassIsOk) {
        throw new AppError(401, "This password  is invalid");
    }

    const user = {
        id: isExists?._id,
        role: isExists?.role,
        email: isExists?.email
    }

    const token = jwt.sign(user, config.jwt_access_secret as string, { expiresIn: "30d" });

    return {
        token
    }



}





export const authenticationServices = {
    registerUserInDB,
    logInUser
}