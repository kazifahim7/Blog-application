import { z } from "zod";

export const blogValidation=z.object({
    body:z.object({
        title:z.string(),
        content:z.string()
    })
})
export const updateBlogValidation=z.object({
    body:z.object({
        title:z.string().optional(),
        content:z.string().optional()
    })
})