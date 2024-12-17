import { Request, Response } from 'express'
import { Autenticar, PayloadAutenticacion } from '../handlers/usuario'

export const RutaAutenticar = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }

    const token = await Autenticar(req.body as PayloadAutenticacion)
    res.status(200).json(token)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
