import { Read, Write } from '../../../db/interface'
import { INotification } from './INotification'

export interface INotificationRepository
	extends Read<INotification>,
		Write<INotification> {}
