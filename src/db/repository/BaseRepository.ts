/* eslint-disable @typescript-eslint/no-explicit-any */

class BaseRepository {
	Model: any

	constructor(Model: any) {
		this.Model = Model
	}

	async fetch<TQuery, TReturn>(query: TQuery): Promise<TReturn> {
		const entity = await this.Model.find(query)
		return entity
	}

	async fetchOne<TQuery, TReturn>(query: TQuery): Promise<TReturn | null> {
		const entity = await this.Model.findOne(query)
		return entity
	}

	async create<TCreate, TReturn>(data: TCreate): Promise<TReturn> {
		const entity = await this.Model.create(data)

		return entity
	}

	async update<TQuery, TUpdate, TReturn>(
		query: TQuery,
		data: TUpdate,
	): Promise<TReturn | null> {
		const entity = await this.Model.findOneAndUpdate(query, data, {new: true})

		return entity
	}

	async destroy<TQuery>(query: TQuery): Promise<boolean> {
		this.Model.findOneAndDelete(query)

		return true
	}
}

export default BaseRepository
