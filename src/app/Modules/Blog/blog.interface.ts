import { Types } from "mongoose"

export type TBlog={
    title:string,
    content:string,
    author:Types.ObjectId,
    isPublished:boolean,
    image:string,
    category:string

}