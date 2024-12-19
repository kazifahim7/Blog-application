import express from 'express'
import validationRequest from '../../Middleware/validationRequest'
import userValidation from './authentication.validation'
import { authenticationController } from './authentication.controller'

const router=express.Router()

router.post("/register",validationRequest(userValidation),authenticationController.registerUser)


export const authenticationRouter=router