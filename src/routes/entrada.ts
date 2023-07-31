import { Request, Response } from 'express'
import { CreateEntrada, EntradaPayload, GetEntradas, UpdateEntrada } from '../handlers/entrada'

export const RouteGetEntradas = async (req: Request, res: Response) => {
  try {
    const entradas = await GetEntradas()
    res.status(200).json(entradas)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RouteUpdateEntrada = async (req: Request, res: Response) => {
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

export const RouteCreateEntrada = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }
    const entrada = await CreateEntrada(req.body as EntradaPayload)
    res.status(200).json(entrada)
  } catch(e: any) {
    console.log(e)
    res.status(400).json({ message: e?.message })
  }
}
