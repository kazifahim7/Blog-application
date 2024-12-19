import { z } from "zod";

const userValidation=z.object({
    body:z.object({
        name:z.string(),
        email:z.string().email("invalid email format"),
        password:z.string()
    })
})

export default userValidation