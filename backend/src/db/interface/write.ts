/* eslint-disable no-unused-vars */
import { UpdateQuery, FilterQuery, HydratedDocument } from 'mongoose'

export interface Write<T> {
	create: (payload: T) => Promise<HydratedDocument<T>>
	update: (
		query: FilterQuery<T>,
		payload: UpdateQuery<T>,
	) => Promise<HydratedDocument<T> | null>
	delete: (query: FilterQuery<T>) => Promise<boolean>
}
