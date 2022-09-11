import BaseRepository from 'src/db/repository/BaseRepository'
import { InAppNotification } from '../models/Notification'
import {
	IReadInAppNotification,
	ICreateInAppNotification,
	IUpdateInAppNotification,
} from '../types/formTypes'
import { IInAppNotification } from '../types/modelTypes'

class InAppNotificationRepository extends BaseRepository {
	fetchOneUser(arg0: { email: any }): any {
		throw new Error('Method not implemented.')
	}
	fetchNotifications = async (
		query?: IReadInAppNotification,
	): Promise<IInAppNotification[] | null> => {
		const users = await this.fetch<
			IReadInAppNotification,
			IInAppNotification[]
		>(query)
		return users
	}
	fetchOneNotification = async (
		query: IReadInAppNotification,
	): Promise<IInAppNotification | null> => {
		const user = await this.read<IReadInAppNotification, IInAppNotification>(
			query,
		)
		return user
	}

	createNotification = async (
		data: ICreateInAppNotification,
	): Promise<IInAppNotification> => {
		const newNotification = await this.create<
			ICreateInAppNotification,
			IInAppNotification
		>(data)
		return newNotification
	}

	updateNotification = async (
		query: IReadInAppNotification,
		data: IUpdateInAppNotification,
	): Promise<IInAppNotification | null> => {
		const updatedNotification = await this.update<
			IReadInAppNotification,
			IUpdateInAppNotification,
			IInAppNotification
		>(query, data)

		return updatedNotification
	}
}

export const inAppNotificationRepository = new InAppNotificationRepository(
	InAppNotification,
)
