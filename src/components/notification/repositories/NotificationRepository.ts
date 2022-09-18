import BaseRepository from 'src/db/repository/BaseRepository'
import { INotification, INotificationRepository } from 'src/types/notification'
import { Notification } from '../models/Notification'

class NotificationRepository
	extends BaseRepository<INotification>
	implements INotificationRepository {}

export const notificationRepository = new NotificationRepository(Notification)
