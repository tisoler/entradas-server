import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'
import { Permiso, iniPermiso } from './permiso'

export class Rol extends Model<
  InferAttributes<Rol>,
  InferCreationAttributes<Rol>
> {
  declare id: CreationOptional<number>
  declare descripcion: string
}

export const iniRol = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Rol.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			descripcion: {
				type: new DataTypes.STRING(250),
				allowNull: false
			},
		},
		{
			sequelize,
			tableName: 'rol',
			timestamps: false
		}
	)

	await iniPermiso()

  if (!Rol.associations['permisos']) Rol.belongsToMany(Permiso, { through: 'rol_permiso', foreignKey: 'idRol', sourceKey: 'id', as: 'permisos', timestamps: false })
  if (!Permiso.associations['roles']) Permiso.belongsToMany(Rol, { through: 'rol_permiso', foreignKey: 'idPermiso', sourceKey: 'id', as: 'roles', timestamps: false })
}
