import { Request, Response } from 'express'
import { SuccessResponse } from '../../../library/helpers/response'
import { notificationService } from '../services/NotificationService'

class NotificationController {
	getNotifications = async (req: Request, res: Response) => {
		const responseData = await notificationService.fetch()

		return new SuccessResponse('Notifications fetched', responseData).send(res)
	}

	getNotificationById = async (req: Request, res: Response) => {
		const userId = req.params.id
		const responseData = await notificationService.read({
			id: userId,
		})

		return new SuccessResponse('Notification fetched', responseData).send(res)
	}

	updateNotification = async (req: Request, res: Response) => {
		const userId = req.params.id

		const responseData = await notificationService.update(
			{ id: userId },
			req.body,
		)

		return new SuccessResponse('Notification updated', responseData).send(res)
	}
}

export default new NotificationController()
