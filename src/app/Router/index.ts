import express from 'express'
import { authenticationRouter } from '../Modules/Authentication/authentication.router'
import { blogRouter } from '../Modules/Blog/blog.router'
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
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router