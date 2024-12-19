import { Types } from "mongoose";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlogIntoDB=async(payload:TBlog,author:Types.ObjectId)=>{
    payload.author=author
    const result = (await BlogModel.create(payload)).populate("author")
    return result
}


export const blogServices={
    createBlogIntoDB
}