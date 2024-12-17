import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { DatosUsuario } from '../handlers/usuario'

export type RequestConUsuario = Request & { usuario?: DatosUsuario }

const verificarToken = (req: RequestConUsuario, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Accesso denegado' })

  try {
    const verificado = jwt.verify(token, process.env.CLAVE_TOKEN || '')
    req.usuario = verificado as DatosUsuario
    next()
  } catch (error) {
    return res.status(400).json({error: 'el token no es válido'})
  }
}

export default verificarToken
