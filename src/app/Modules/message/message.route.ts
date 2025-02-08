import express from 'express'
import { messageController } from './message.controller'
import auth from '../../Middleware/auth'
const router = express.Router()


router.post("/send-message",messageController.createMessage)
router.get("/send-message",auth("admin"),messageController.getAllMessage)






export const messageRouter = router