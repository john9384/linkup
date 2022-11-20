import { Schema, model } from 'mongoose'
import { INotification } from '../../../types/notification'

const NotificationSchema = new Schema(
	{
		userId: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		collection: 'notifications',
	},
)

export const Notification = model<INotification>(
	'notification',
	NotificationSchema,
)
