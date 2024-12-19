import { z } from "zod";

export const blogValidation=z.object({
    body:z.object({
        title:z.string(),
        content:z.string()
    })
})