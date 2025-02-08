import express from 'express'
import { authenticationRouter } from '../Modules/Authentication/authentication.router'
import { blogRouter } from '../Modules/Blog/blog.router'
import { adminRouter } from '../Modules/Admin/Admin.router'
import { projectRouter } from '../Modules/Project/project.route'
import { messageRouter } from '../Modules/message/message.route'
const router = express.Router()





const modulesRoute = [
    
    {
        path: "/auth",
        route: authenticationRouter
    },
    {
        path: "/blogs",
        route: blogRouter
    },
    {
        path: "/admin",
        route: adminRouter
    },
    {
        path: "/project",
        route: projectRouter
    },
    {
        path: "/message",
        route: messageRouter
    },
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router