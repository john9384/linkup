import { Request, Response } from 'express'
import { buildResponse } from '../../library/utils/response-builder'
import { OK } from '../../library/constants/http-status'
import notificationService from './notificationService'

class NotificationController {
	getNotifications = async (req: Request, res: Response) => {
		const users = await notificationService.fetchNotifications()
		// TODO
		// Make room for fetching with query parameters
		// Make room for pagination
		const responseData = users

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Notification fetched',
				data: responseData,
			}),
		)
	}

	getNotificationById = async (req: Request, res: Response) => {
		const userId = req.params.id
		const user = await notificationService.fetchOneNotification({ id: userId })
		const responseData = user

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}

	updateNotification = async (
		req: Request,
		res: Response,
	) => {
		const userId = req.params.id
		const formData = req.body
		const updatedNotification = await notificationService.updateNotification(
			{ id: userId },
			formData,
		)
		const responseData = updatedNotification

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}
}

export default new NotificationController()
