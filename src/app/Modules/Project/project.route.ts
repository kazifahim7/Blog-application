import express from 'express'
import auth from '../../Middleware/auth'
import { projectController } from './project.controller'

const router = express.Router()


router.post('/create-project',auth("admin"),projectController.createProject)
router.get("/",projectController.getAllProject)
router.get("/:id",projectController.getSingleProject)
router.delete("/:id",auth("admin"),projectController.deleProject)
router.patch("/:id",auth("admin"),projectController.updateProject)





export const projectRouter = router