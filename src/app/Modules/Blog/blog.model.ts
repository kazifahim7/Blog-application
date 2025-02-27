import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title:{type:String,required:[true,"title is required"]},
    category:{type:String,required:[true,"category is required"]},
    image:{type:String,required:[true,"image is required"]},
    content:{type:String,required:[true,"content is required"]},
    author: { type: Schema.Types.ObjectId, ref:"User",required:true},
    isPublished:{type:Boolean,default:true}

    
},{
    timestamps:true
});

// <- Create a Model.->
export const BlogModel = model<TBlog>('Blog', blogSchema);