// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema, model } from 'mongoose'

const postSchema = new Schema(
	{
		userId: {
			type: String,
			trim: true,
		},
		content: {
			type: String,
			trim: true,
		},
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
