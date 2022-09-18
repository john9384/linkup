import { Schema, model } from 'mongoose'
import { IOtp } from '../../../types/notification'

const otpSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		transporter: {
			type: String,
			lowercase: true,
			trim: true,
		},
		transporterType: {
			type: String,
			trim: true,
			default: 'EMAIL',
		},
		instance: {
			type: String,
			trim: true,
		},
		token: {
			type: String,
			trim: true,
		},
		tokenExpires: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		collection: 'otps',
	},
)

export const Otp = model<IOtp>('otp', otpSchema)
