import { ObjectId } from 'mongodb'
import { PaginationOptions } from './types'

class BaseRepository {
	Model: any

	constructor(Model: any) {
		this.Model = Model
	}

	async fetch<TRead, TReturn>(query?: TRead, fields?: any): Promise<TReturn> {
		const queryObj = this._setQueryObj(query)
		const models = await this.Model.find(queryObj).select(fields)
		return models
	}

	async fetchAndPaginate<TRead, TReturn>(
		query?: TRead,
		pagination?: PaginationOptions,
	): Promise<TReturn> {
		const queryObj = this._setQueryObj(query)
		const models = await this.Model.find(queryObj)
			.sort({ createdAt: -1 })
			.skip(pagination?.page)
			.limit(pagination?.limit)

		return models
	}

	async fetchOne<TRead, TReturn>(
		query: TRead,
		fields?: any,
	): Promise<TReturn | null> {
		const queryObj = this._setQueryObj(query)
		const model = await this.Model.findOne(queryObj).select(fields)
		return model
	}

	async create<TCreate, TReturn>(data: TCreate): Promise<TReturn> {
		const model = await this.Model.create(data)

		return model
	}

	async update<TRead, TUpdate, TReturn>(
		query: TRead,
		data: TUpdate,
	): Promise<TReturn | null> {
		const queryObj = this._setQueryObj(query)
		const model = await this.Model.findOneAndUpdate(queryObj, data, {
			new: true,
		})

		await model.save()

		return model
	}

	async destroy<TRead>(query: TRead): Promise<boolean> {
		const queryObj = this._setQueryObj(query)
		await this.Model.deleteOne(queryObj)

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
