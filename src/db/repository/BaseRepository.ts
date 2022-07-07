/* eslint-disable @typescript-eslint/no-explicit-any */

class BaseRepository {
	Model: any

	constructor(Model: any) {
		this.Model = Model
	}

	async fetch<TQuery, TReturn>(query?: TQuery): Promise<TReturn> {
		const models = await this.Model.find(query)
		return models
	}

	async fetchOne<TQuery, TReturn>(query: TQuery): Promise<TReturn | null> {
		const model = await this.Model.findOne(query)
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
		const model = await this.Model.findOneAndUpdate(query, data, { new: true })

		return model
	}

	async destroy<TQuery>(query: TQuery): Promise<boolean> {
		this.Model.findOneAndDelete(query)

		return true
	}
}

export default BaseRepository
