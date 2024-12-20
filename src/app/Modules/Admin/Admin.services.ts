import AppError from "../../Error/AppEror"
import { UserModel } from "../Authentication/authentication.model"
import { BlogModel } from "../Blog/blog.model"

const blockUserFromDB=async(id:string)=>{
    const isExists = await UserModel.findById(id)

    if (!isExists) {
        throw new AppError(404, "This User does not exists");

    }
    
    const result= await UserModel.findByIdAndUpdate(id,{isBlocked:true},{new:true})
    return result
}
const deleteBlogFromDB=async(id:string)=>{
    const isExists= await BlogModel.findById(id)

    if(!isExists){
        throw new AppError(404,"This blog does not exists");
        
    }
    const result= await BlogModel.findByIdAndDelete(id)
    return result
}


export const adminServices={
    blockUserFromDB,
    deleteBlogFromDB
}