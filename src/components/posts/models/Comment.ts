import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'posts',
		},
		content: {
			type: String,
		},
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
		collection: 'comments',
	},
)

export const Post = model('comment', commentSchema)
