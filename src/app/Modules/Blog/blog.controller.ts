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



export const blogController={
    createBlog
}