import BaseRepository from '../../db/repository/BaseRepository'
import { Notification } from './models/Notification'
import {
	ICreateNotification,
	IUpdateNotification,
	IQueryNotification,
} from './types/formTypes'
import { INotification } from './types/modelTypes'

class NotificationRepository extends BaseRepository {
	fetchOneUser(arg0: { email: any }): any {
		throw new Error('Method not implemented.')
	}
	fetchNotifications = async (
		query?: IQueryNotification,
	): Promise<INotification[] | null> => {
		const users = await this.fetch<IQueryNotification, INotification[]>(query)
		return users
	}
	fetchOneNotification = async (
		query: IQueryNotification,
	): Promise<INotification | null> => {
		const user = await this.fetchOne<IQueryNotification, INotification>(query)
		return user
	}

	createNotification = async (
		data: ICreateNotification,
	): Promise<INotification> => {
		const newNotification = await this.create<
			ICreateNotification,
			INotification
		>(data)
		return newNotification
	}

	updateNotification = async (
		query: IQueryNotification,
		data: IUpdateNotification,
	): Promise<INotification | null> => {
		const updatedNotification = await this.update<
			IQueryNotification,
			IUpdateNotification,
			INotification
		>(query, data)

		return updatedNotification
	}
}

const userRepository = new NotificationRepository(Notification)

export default userRepository
