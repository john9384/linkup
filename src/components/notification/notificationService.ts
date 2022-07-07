import { CustomError } from '../../library/helpers/error'
import { BAD_REQUEST } from '../../library/constants/http-status'
import { INotification } from './types/modelTypes'
import { ICreateNotification, IQueryNotification, IUpdateNotification } from './types/formTypes'
import notificationRepository from './notificationRepository'

class NotificationService {
	fetchNotifications = async (query?: IQueryNotification): Promise<INotification[] | null> => {
		const notifications = await notificationRepository.fetchNotifications(query)
		return notifications
	}

	fetchOneNotification = async (query: IQueryNotification): Promise<INotification | null> => {
		const notification = await notificationRepository.fetchOneNotification(query)

		return notification
	}

	createNotification = async (data: ICreateNotification): Promise<INotification> => {
		const notification = await notificationRepository.fetchOneNotification({ email: data.email })

		if (notification) {
			throw new CustomError({
				message: 'Notification with email exits',
				status: BAD_REQUEST,
			})
		}
		const newNotification = await notificationRepository.createNotification(data)

		return newNotification
	}

	updateNotification = async (
		query: IQueryNotification,
		data: IUpdateNotification,
	): Promise<INotification | null> => {
		const notification = await notificationRepository.updateNotification(query, data)
		return notification
	}
}

export default new NotificationService()
