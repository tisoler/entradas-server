import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { RouteCreateEntrada, RouteGetEntradas, RouteUpdateEntrada } from './routes/entrada'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// create server
const app: Express = express()
app.use(express.json())

// router
export const apiRouter: Router = express.Router()

// cors configuration
const corsOptions = {
	origin: [FRONTEND_URL, 'http://localhost:3000'],
	optionsSuccessStatus: 200
}

// @ts-ignore
app.use(cors(corsOptions))
app.use(apiRouter)
apiRouter.get('/entrada', RouteGetEntradas)
apiRouter.put('/entrada', RouteUpdateEntrada)
apiRouter.post('/entrada', RouteCreateEntrada)

const port = API_PORT || 3025
app.listen(port, () => {
  console.log(`⚡️[Server]: Server running in http://localhost:${port}`)
})
