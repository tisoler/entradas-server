import { Request, Response } from 'express'
import { CreateEntrada, EntradaPayload, GetEntradas, UpdateEntrada } from '../handlers/entrada'
import { RequestConUsuario } from '../middleware/verificadorToken'
import { DatosUsuario } from '../handlers/usuario'

export const RutaGetEntradas = async (req: Request, res: Response) => {
  try {
    const entradas = await GetEntradas()
    res.status(200).json(entradas)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaUpdateEntrada = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }
    const entrada = await UpdateEntrada(req.body as EntradaPayload)
    res.status(200).json(entrada)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCreateEntrada = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }
    const entrada = await CreateEntrada(req.body as EntradaPayload, req.usuario as DatosUsuario)
    res.status(200).json(entrada)
  } catch(e: any) {
    console.log(e)
    res.status(400).json({ message: e?.message })
  }
}
