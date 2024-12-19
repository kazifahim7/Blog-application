import express from 'express'
import validationRequest from '../../Middleware/validationRequest'
import userValidation, { logInValidation } from './authentication.validation'
import { authenticationController } from './authentication.controller'

const router=express.Router()

router.post("/register",validationRequest(userValidation),authenticationController.registerUser)
router.post("/login",validationRequest(logInValidation),authenticationController.logInUser)


export const authenticationRouter=router