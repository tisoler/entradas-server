import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { RutaCreateEntrada, RutaGetEntradas, RutaUpdateEntrada } from './routes/entrada'
import { RutaAutenticar } from './routes/usuario'
import verificarToken from './middleware/verificadorToken'

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
app.use('/api', apiRouter)

apiRouter.post('/autenticar', RutaAutenticar)
apiRouter.get('/entrada', verificarToken, RutaGetEntradas)
apiRouter.put('/entrada', verificarToken, RutaUpdateEntrada)
apiRouter.post('/entrada', verificarToken, RutaCreateEntrada)

const port = API_PORT || 3025
app.listen(port, () => {
  console.log(`⚡️[Server]: Server running in http://localhost:${port}`)
})
