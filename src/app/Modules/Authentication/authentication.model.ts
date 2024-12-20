import { model, Schema } from "mongoose";
import { TRegister } from "./authentication.interface";


const userSchema = new Schema<TRegister>({
    name: { type: String, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"]},
    password:{type:String,required:[true,"password is required"]},
    role:{type:String,enum:["admin","user"],default:"user"},
    isBlocked:{type:Boolean,default:false}


},{
    timestamps:true
});


export const UserModel = model<TRegister>('User', userSchema);