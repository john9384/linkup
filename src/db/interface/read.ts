/* eslint-disable no-unused-vars */
import { FilterQuery, HydratedDocument } from 'mongoose'

export interface Read<T> {
	fetch(
		query: FilterQuery<T>,
		fields?: string[],
	): Promise<Array<HydratedDocument<T>>>
	read: (
		query: FilterQuery<T>,
		fields?: string[],
	) => Promise<HydratedDocument<T> | null>
}
