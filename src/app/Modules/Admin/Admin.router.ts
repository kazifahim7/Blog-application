import express from 'express'
import auth from '../../Middleware/auth'
import { adminController } from './Admin.controler'


const router=express.Router()

router.patch("/users/:userId/block",auth("admin"),adminController.blockUser)

router.delete("/admin/blogs/:id",auth("admin"),adminController.deleteBlog)







export const adminRouter=router