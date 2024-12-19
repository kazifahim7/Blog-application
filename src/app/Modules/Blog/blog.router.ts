import express from 'express'
import auth from '../../Middleware/auth'
import validationRequest from '../../Middleware/validationRequest'
import { blogValidation } from './blog.validation'
import { blogController } from './blog.controller'


const router = express.Router()

 router.post('/',auth("user"),validationRequest(blogValidation),blogController.createBlog)

 




export const blogRouter=router




