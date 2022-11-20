import BaseRepository from 'db/repository/BaseRepository'
import { INotification, INotificationRepository } from 'types/notification'
import { Notification } from '../models/Notification'

class NotificationRepository
	extends BaseRepository<INotification>
	implements INotificationRepository {}

export const notificationRepository = new NotificationRepository(Notification)
