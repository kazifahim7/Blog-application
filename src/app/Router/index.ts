import express from 'express'
import { authenticationRouter } from '../Modules/Authentication/authentication.router'
import { blogRouter } from '../Modules/Blog/blog.router'
import { adminRouter } from '../Modules/Admin/Admin.router'
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
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router