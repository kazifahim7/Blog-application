import config from "../../config";
import { TRegister } from "./authentication.interface";
import { UserModel } from "./authentication.model";
import bcrypt from "bcrypt";

const registerUserInDB = async (payload: TRegister) => {

    // <- hash Password ->
    payload.password = await bcrypt.hash(payload.password, Number(config.salt_round))
    //<- save to DB ->
    console.log(payload)
    const result = await UserModel.create(payload)
    return result
}





export const authenticationServices = {
    registerUserInDB
}