import { Entrada, initEntrada } from '../models/entrada'

export type EntradaPayload = {
	id: number,
	nombre: string,
	dni: number,
	pagada: boolean,
	verificada: boolean,
}

export const GetEntradas = async (): Promise<Entrada[]> => {
	try {
		await initEntrada()
		const entradas = await Entrada.findAll()

		if (!entradas?.length) {
			console.log(`There are no entradas.`)
			return []
		}

		return entradas
	} catch (e) {
		throw e
	}
}

// Solamente se pueden actualizar pagada y verificada
export const UpdateEntrada = async (payload: EntradaPayload): Promise<Entrada> => {
	try {
		const entradaToUpdate = await Entrada.findByPk(payload.id)
		if (entradaToUpdate) {
			entradaToUpdate.pagada = payload.pagada
			entradaToUpdate.verificada = payload.verificada
			
			const updatedEntrada = await entradaToUpdate.save()
			if (!updatedEntrada) throw new Error('Error updating entrada')
			return updatedEntrada
		}

		console.log(`Etrada not found (id: ${payload.id}).`)
		throw new Error(`Entrada no encontrada (id: ${payload.id}).`)
	} catch (e) {
		throw e
	}
}

export const CreateEntrada = async (payload: EntradaPayload): Promise<Entrada> => {
	try {
    if (!payload.dni) throw new Error('DNI no ingresado')

    const entradaExistente = await Entrada.findOne({ where: { dni: payload.dni }})
    if (entradaExistente) throw new Error('El DNI ya tiene una entrada registrada.')

    const newEntrada = await Entrada.create({
      nombre: payload.nombre || '',
      dni: payload.dni,
      pagada: payload.pagada || false,
      verificada: false,
    })
    
    const nuevaEntrada = await newEntrada.save()
    if (!nuevaEntrada) throw new Error('Error creating entrada')
    return nuevaEntrada
	} catch (e) {
		throw e
	}
}
