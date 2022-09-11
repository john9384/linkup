import { Schema, model } from 'mongoose'

const postSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		user: {
			fullname: {
				type: String,
			},
			username: {
				type: String,
			},
			avatar: {
				type: String,
			},
		},
		content: {
			type: String,
			trim: true,
		},
		images: [
			{
				type: String,
				trim: true,
			},
		],
		likes: [
			{
				type: String,
				trim: true,
			},
		],
		comments: [
			{
				commentId: {
					type: Schema.Types.ObjectId,
					ref: 'comments',
				},
			},
		],
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		collection: 'posts',
	},
)

export const Post = model('post', postSchema)
