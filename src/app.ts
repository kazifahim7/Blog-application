import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/Router'
import notFound from './app/Middleware/notFound'
import errorHandler from './app/Middleware/globalError'
// import router from './app/Router'

const app:Application = express()


//     <- Parser ->
app.use(express.json())
app.use(cors()) 

// <- Router->
app.use("/api",router)

app.get('/', (req:Request, res:Response) => {
    res.send('welcome')
})


// <- not Found middleware ->
app.use(notFound)

// <- global Error handler is here->
app.use(errorHandler)




export default app