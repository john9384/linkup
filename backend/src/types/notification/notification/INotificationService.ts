import { PaginationOptions } from '../../../db/repository/types'
import { INotification } from './INotification'
import {
	ICreateNotification,
	IDeleteNotification,
	IReadNotification,
	IUpdateNotification,
} from './INotificationDTO'

export interface INotificationService {
	fetch(
		query?: IReadNotification,
		pagination?: PaginationOptions,
	): Promise<Array<Partial<INotification>> | null>

	create(payload: ICreateNotification): Promise<Partial<INotification>>

	read(query: IReadNotification): Promise<Partial<INotification> | null>

	update(
		query: IReadNotification,
		payload: IUpdateNotification,
	): Promise<Partial<INotification>>

	delete(query: IDeleteNotification): Promise<boolean>
}
