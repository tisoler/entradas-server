import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'

export class Entrada extends Model<
  InferAttributes<Entrada>,
  InferCreationAttributes<Entrada>
> {
  declare id: CreationOptional<number>
	declare nombre: string
  declare dni: number
  declare pagada: boolean
  declare verificada: boolean
  declare idUsuario: number
}

export const initEntrada = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Entrada.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			nombre: {
				type: new DataTypes.STRING,
				allowNull: false
			},
			dni: {
				type: new DataTypes.NUMBER,
				allowNull: false
			},
      pagada: {
				type: new DataTypes.BOOLEAN,
				allowNull: false
			},
      verificada: {
				type: new DataTypes.BOOLEAN,
				allowNull: false
			},
      idUsuario:  {
				type: new DataTypes.INTEGER,
				allowNull: false
			},
		},
		{
			sequelize,
			tableName: 'entrada',
			timestamps: false
		}
	)
}
