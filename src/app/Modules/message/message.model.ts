import { model, Schema } from "mongoose";
import { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
    {
        name:{type:String,required:true},
        email: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    }
)



export const messageModel=model<TMessage>("message",messageSchema)