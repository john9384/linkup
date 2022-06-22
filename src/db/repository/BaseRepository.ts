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
		const entity = await this.Model.find(query)
		return entity[0]
	}

	async create<TCreate, TReturn>(data: TCreate): Promise<TReturn> {
		const entity = await this.Model.create(data)
		await entity.save()

		return entity
	}

	async update<TQuery, TUpdate, TReturn>(
		query: TQuery,
		data: TUpdate,
	): Promise<TReturn | null> {
		const entity = await this.Model.findOneBy(query)
		await entity.save(data)

		return entity
	}

	async destroy<TQuery>(query: TQuery): Promise<boolean> {
		this.Model.delete(query)

		return true
	}
}

export default BaseRepository
