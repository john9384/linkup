import { Schema, model } from 'mongoose'
import { IUser } from 'src/types/user'

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			trim: true,
		},
		lastname: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		username: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		avatar: {
			type: String,
			trim: true,
			defualt: '',
		},
		bgImgUrl: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			trim: true,
		},
		religion: {
			type: String,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		phoneVerified: {
			type: Boolean,
			default: false,
		},
		friends: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'users',
				},
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		collection: 'users',
	},
)

export const User = model<IUser>('user', userSchema)
