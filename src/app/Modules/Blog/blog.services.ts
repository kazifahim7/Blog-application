import { Types } from "mongoose";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import AppError from "../../Error/AppEror";
import QueryBuilder from "../../builder/QueryBuilder";

const createBlogIntoDB=async(payload:TBlog,author:Types.ObjectId)=>{
    payload.author=author
    const result = (await BlogModel.create(payload)).populate("author")
    return result
}
const updateBlogFromDB=async(id:string,payload:Record<string,unknown>,author:Types.ObjectId)=>{
    // <- is blog is exists->
    const isBlogExists= await BlogModel.findById(id)

    if(!isBlogExists){
        throw new AppError(404,"this blog does not exist");
        
    }
    if (!isBlogExists.author.equals(author)) {
        throw new AppError(403, "You are not authorized to update this blog");
    }


    payload.author=author
    const result = await BlogModel.findByIdAndUpdate(id,{...payload},{new:true}).populate("author")
    return result
}
const deleteBlogFromDB = async (id: string,  author: Types.ObjectId) => {
    // <- is blog is exists->
    const isBlogExists = await BlogModel.findById(id)

    if (!isBlogExists) {
        throw new AppError(404, "this blog does not exist");

    }
    if (!isBlogExists.author.equals(author)) {
        throw new AppError(403, "You are not authorized to update this blog");
    }


    
    const result = await BlogModel.findByIdAndDelete(id)
    return result
}
const getAllBlogFromDB=async(query:Record<string,unknown>)=>{
    const blogQuery = new QueryBuilder(BlogModel.find().populate("author"),query).search(["title","content"]).filter().sortBy().sortOrder()
    const result= await blogQuery.modelQuery

    return result
}




export const blogServices={
    createBlogIntoDB,
    updateBlogFromDB,
    deleteBlogFromDB,
    getAllBlogFromDB
}