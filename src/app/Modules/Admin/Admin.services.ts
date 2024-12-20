import { UserModel } from "../Authentication/authentication.model"

const blockUserFromDB=async(id:string)=>{
    const result= await UserModel.findByIdAndUpdate(id,{isBlocked:true},{new:true})
    return result
}


export const adminServices={
    blockUserFromDB
}