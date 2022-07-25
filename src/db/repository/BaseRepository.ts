/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ObjectId } from 'mongodb'
import { PaginationOptions } from './types'

class BaseRepository {
	Model: any

	constructor(Model: any) {
		this.Model = Model
	}

	async fetch<TQuery, TReturn>(query?: TQuery, fields?: any): Promise<TReturn> {
		const queryObj = this.setQueryObj(query)
		const models = await this.Model.find(queryObj).select(fields)
		return models
	}

	async fetchAndPaginate<TQuery, TReturn>(
		query?: TQuery,
		pagination?: PaginationOptions,
	): Promise<TReturn> {
		const queryObj = this.setQueryObj(query)
		const models = await this.Model.find(queryObj)
			.skip(pagination?.page)
			.limit(pagination?.limit)

		return models
	}

	async fetchOne<TQuery, TReturn>(
		query: TQuery,
		fields?: any,
	): Promise<TReturn | null> {
		const queryObj = this.setQueryObj(query)
		const model = await this.Model.findOne(queryObj).select(fields)
		return model
	}

	async create<TCreate, TReturn>(data: TCreate): Promise<TReturn> {
		const model = await this.Model.create(data)

		return model
	}

	async update<TQuery, TUpdate, TReturn>(
		query: TQuery,
		data: TUpdate,
	): Promise<TReturn | null> {
		const queryObj = this.setQueryObj(query)
		const model = await this.Model.findOneAndUpdate(queryObj, data, {
			new: true,
		})

		await model.save()

		return model
	}

	async destroy<TQuery>(query: TQuery): Promise<boolean> {
		const queryObj = this.setQueryObj(query)
		await this.Model.deleteOne(queryObj)

		return true
	}

	private setQueryObj(obj: any) {
		if (!obj) return null
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty('id')) {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const _id = new ObjectId(obj.id)
			// eslint-disable-next-line no-param-reassign
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
