import express from 'express'
import auth from '../../Middleware/auth'
import validationRequest from '../../Middleware/validationRequest'
import { blogValidation, updateBlogValidation } from './blog.validation'
import { blogController } from './blog.controller'


const router = express.Router()

 router.post('/',auth("user"),validationRequest(blogValidation),blogController.createBlog)
 router.put('/:id',auth("user"),validationRequest(updateBlogValidation),blogController.updateBlog)
 router.delete('/:id',auth("user"),blogController.deleteBlog)
 router.get('/',auth("user","admin"),blogController.getAllBlog)

 




export const blogRouter=router




