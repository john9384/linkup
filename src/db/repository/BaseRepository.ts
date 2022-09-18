import { Model, FilterQuery, HydratedDocument, UpdateQuery } from 'mongoose'
import { ObjectId } from 'mongodb'
import { PaginationOptions } from './types'
import { IBaseRepository } from '../interface/IBaseRepository'

class BaseRepository<T> implements IBaseRepository<T> {
	private _model: Model<T>

	constructor(model: Model<T>) {
		this._model = model
	}

	async fetch(
		query?: FilterQuery<T>,
		fields?: string[],
	): Promise<Array<HydratedDocument<T>>> {
		const queryObj = this._setQueryObj(query)
		const models = await this._model.find(queryObj).select(fields)
		return models
	}

	async fetchAndPaginate(
		query?: FilterQuery<T>,
		pagination?: PaginationOptions,
	): Promise<Array<HydratedDocument<T>>> {
		const queryObj = this._setQueryObj(query)
		const models = await this._model
			.find(queryObj)
			.sort({ createdAt: -1 })
			.skip(Number(pagination?.page))
			.limit(Number(pagination?.limit))

		return models
	}

	async read(
		query: FilterQuery<T>,
		fields?: string[],
	): Promise<HydratedDocument<T> | null> {
		const queryObj = this._setQueryObj(query)

		const model = await this._model.findOne(queryObj).select(fields)
		return model
	}

	async create(payload: T): Promise<HydratedDocument<T>> {
		const model = await this._model.create(payload)

		return model
	}

	async update(
		query: FilterQuery<T>,
		payload: UpdateQuery<T>,
	): Promise<HydratedDocument<T> | null> {
		const queryObj = this._setQueryObj(query)
		const model = await this._model.findOneAndUpdate(queryObj, payload, {
			new: true,
		})

		await model?.save()

		return model
	}

	async delete<TRead>(query: TRead): Promise<boolean> {
		const queryObj = this._setQueryObj(query)
		await this._model.deleteOne(queryObj)

		return true
	}

	private _setQueryObj(obj: any) {
		if (!obj) return null
		if (obj.hasOwnProperty('id')) {
			const _id = new ObjectId(obj.id)
			delete obj.id

			return {
				_id,
				...obj,
			}
		}
		return obj
	}
}

export default BaseRepository
