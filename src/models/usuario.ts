import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'
import { Rol, iniRol } from './rol'

export class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  declare id: CreationOptional<number>
  declare usuario: string
  declare password: string
}

export const iniUsuario = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Usuario.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			usuario: {
				type: new DataTypes.STRING(150),
				allowNull: false
			},
			password: {
				type: new DataTypes.STRING(250),
				allowNull: false
			},
		},
		{
			sequelize,
			tableName: 'usuario',
			timestamps: false
		}
	)

	await iniRol()

  if (!Rol.associations['ususarios']) Rol.belongsToMany(Usuario, { through: 'usuario_rol', foreignKey: 'idRol', sourceKey: 'id', as: 'usuarios', timestamps: false })
  if (!Usuario.associations['roles']) Usuario.belongsToMany(Rol, { through: 'usuario_rol', foreignKey: 'idUsuario', sourceKey: 'id', as: 'roles', timestamps: false })
}
