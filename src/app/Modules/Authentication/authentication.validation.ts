import { z } from "zod";

const userValidation=z.object({
    body:z.object({
        name:z.string(),
        email:z.string().email("invalid email format"),
        password:z.string()
    })
})

export const logInValidation=z.object({
    body:z.object({
        email: z.string().email("invalid email format"),
        password: z.string({required_error:"password is Required"})
    })
})

export default userValidation