// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema, model } from 'mongoose'

const notificationSchema = new Schema(
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

export const Notification = model('notification', notificationSchema)
