import { Schema, model } from 'mongoose'

const InAppNotificationSchema = new Schema(
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

export const InAppNotification = model('notification', InAppNotificationSchema)
