import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogServices } from "./blog.services";

const createBlog=catchAsync(async(req:Request,res:Response)=>{
    

    const result= await blogServices.createBlogIntoDB(req?.body,req.user?.id)
    if(result?.author && typeof result.author==="object"){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result.author as any).password=''
        
    }
    res.status(201).json({
        success:true,
        message: "Blog created successfully",
        statusCode:201,
        data:result
    })
})
const updateBlog=catchAsync(async(req:Request,res:Response)=>{
    

    const result= await blogServices.updateBlogFromDB(req.params?.id,req?.body,req.user?.id)
    if(result?.author && typeof result.author==="object"){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result.author as any).password=''
        
    }
    res.status(200).json({
        success:true,
        message: "Blog updated  successfully",
        statusCode:200,
        data:result
    })
})
const deleteBlog=catchAsync(async(req:Request,res:Response)=>{
    

     await blogServices.deleteBlogFromDB(req.params?.id,req.user?.id)

    res.status(200).json({
        success:true,
        message: "Blog deleted  successfully",
        statusCode:200,
    })
})
const getAllBlog=catchAsync(async(req:Request,res:Response)=>{
    

    const result= await blogServices.getAllBlogFromDB(req?.query)

    if(result.length >0){
        
        result.forEach(blog=>{
            if(blog.author){
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               ( blog.author as any).password=''
            }
        })
    }
   

    res.status(200).json({
        success:true,
        message: "Blogs fetched successfully",
        statusCode:200,
        data:result
    })
})



export const blogController={
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog
}