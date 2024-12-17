import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Usuario, iniUsuario } from "../models/usuario"
import { Rol } from '../models/rol'
import { Permiso } from '../models/permiso'

export interface DatosUsuario {
  idUsuario: number,
  usuario: string,
  roles: string[],
  scope: string[],
}

export interface PayloadAutenticacion {
  usuario: string,
  password: string
}

export const Autenticar = async (payload: PayloadAutenticacion): Promise<string | null> => {
	await iniUsuario()

	const usuario = await Usuario.findOne({
    attributes: [
      'id',
      'usuario',
      'password',
    ],
    include: [
      {
        model: Rol,
        attributes: ['id', 'descripcion'],
        as: 'roles',
        include: [
          {
            model: Permiso,
            attributes: ['id', 'descripcion'],
            as: 'permisos',
          },
        ],
      },
    ],
    where: { usuario: payload.usuario },
  })

  if (!usuario) {
    console.log(`Usuario no encontrado, usuario: ${payload.usuario}.`)
    return null
  }

  const esAutenticacionValida = await bcrypt.compare(payload.password, usuario.password)
  if (!esAutenticacionValida) {
    throw new Error('Usuario o password incorrectos.')
  }

  const roles = usuario.get('roles') as Rol[] || []
  const permisos = roles?.map(r => r.get('permisos'))?.flat() as Permiso[] || []
  const rolesPermisos = { roles: roles.map(r => r.descripcion), scope: permisos.map(p => p.descripcion) }

  const datosToken: DatosUsuario = {
    idUsuario: usuario.id,
    usuario: usuario.usuario,
    ...rolesPermisos,
  }

  const token = jwt.sign(datosToken, process.env.CLAVE_TOKEN || '', {
    expiresIn: '2 days',
  })

  return token
}
