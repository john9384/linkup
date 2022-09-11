import { BadRequestError } from 'src/library/helpers'
import { inAppNotificationRepository } from '../repositories/InAppNotificationRepository'
import {
	ICreateInAppNotification,
	IReadInAppNotification,
	IUpdateInAppNotification,
} from '../types/formTypes'
import { IInAppNotification } from '../types/modelTypes'

class InAppNotificationService {
	fetchNotifications = async (
		query?: IReadInAppNotification,
	): Promise<IInAppNotification[] | null> => {
		const notifications = await inAppNotificationRepository.fetchNotifications(
			query,
		)
		return notifications
	}

	fetchOneNotification = async (
		query: IReadInAppNotification,
	): Promise<IInAppNotification | null> => {
		const notification = await inAppNotificationRepository.fetchOneNotification(
			query,
		)

		return notification
	}

	createNotification = async (
		data: ICreateInAppNotification,
	): Promise<IInAppNotification> => {
		const notification = await inAppNotificationRepository.fetchOneNotification(
			{
				email: data.email,
			},
		)

		if (notification) {
			throw new BadRequestError('Notification with email exits')
		}
		const newNotification =
			await inAppNotificationRepository.createNotification(data)

		return newNotification
	}

	updateNotification = async (
		query: IReadInAppNotification,
		data: IUpdateInAppNotification,
	): Promise<IInAppNotification | null> => {
		const notification = await inAppNotificationRepository.updateNotification(
			query,
			data,
		)
		return notification
	}
}

export const inAppNotificationService = new InAppNotificationService()
