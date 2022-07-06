import { Schema, model } from 'mongoose'

const otpSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		transporter: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		transporterType: {
			type: String,
			trim: true,
			default: 'EMAIL',
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

export const Otp = model('otp', otpSchema)
