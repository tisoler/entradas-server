import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'

export class Permiso extends Model<
  InferAttributes<Permiso>,
  InferCreationAttributes<Permiso>
> {
  declare id: CreationOptional<number>
  declare descripcion: string
}

export const iniPermiso = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Permiso.init(
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
			tableName: 'permiso',
			timestamps: false
		}
	)
}
