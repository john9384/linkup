import { BadRequestError } from '../../../library/helpers'
import {
	IReadNotification,
	INotification,
	ICreateNotification,
	IUpdateNotification,
} from 'src/types/notification'
import { notificationRepository } from '../repositories/NotificationRepository'

class NotificationService {
	fetch = async (
		query?: IReadNotification,
	): Promise<INotification[] | null> => {
		const notifications = await notificationRepository.fetch(query)
		return notifications
	}

	read = async (query: IReadNotification): Promise<INotification | null> => {
		const notification = await notificationRepository.read(query)

		return notification
	}

	create = async (data: ICreateNotification): Promise<INotification> => {
		const notification = await notificationRepository.read({
			email: data.email,
		})

		if (notification) {
			throw new BadRequestError('Notification with email exits')
		}
		const newNotification = await notificationRepository.create(data)

		return newNotification
	}

	update = async (
		query: IReadNotification,
		data: IUpdateNotification,
	): Promise<INotification | null> => {
		const notification = await notificationRepository.update(query, data)
		return notification
	}
}

export const notificationService = new NotificationService()
