import { TMessage } from "./message.interface";
import { messageModel } from "./message.model";

const createMessage = async (data: TMessage) => { 

    const result = await messageModel.create(data)
    return result
}

const getAllMessage = async()=>{
    const result = await messageModel.find()
    return result
}







export const messageService = {
    createMessage,
    getAllMessage
}