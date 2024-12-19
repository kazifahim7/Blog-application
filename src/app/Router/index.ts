import express from 'express'
import { authenticationRouter } from '../Modules/Authentication/authentication.router'
const router = express.Router()





const modulesRoute = [
    
    {
        path: "/auth",
        route: authenticationRouter
    },
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router