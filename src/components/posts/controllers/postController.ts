import { Request, Response } from 'express'
import { buildResponse } from '../../../library/utils/response-builder'
import { OK } from '../../../library/constants/http-status'
import postService from '../services/postService'

class PostController {
	getPosts = async (req: Request, res: Response) => {
		const { page, limit } = req.query

		const posts = await postService.fetchPosts(
			{},
			{ page: Number(page), limit: Number(limit) },
		)

		const responseData = posts

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Post fetched',
				data: responseData,
			}),
		)
	}

	getPostById = async (req: Request, res: Response) => {
		const postId = req.params.id
		const post = await postService.fetchOnePost({ id: postId })
		const responseData = post

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}

	createPost = async (req: Request, res: Response) => {
		// Validate post
		const userId = req.user.id
		const { content } = req.body
		const post = await postService.createPost({
			userId,
			content,
			images: [],
		})
		const responseData = post

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Post created',
				data: responseData,
			}),
		)
	}

	updatePost = async (req: Request, res: Response) => {
		const postId = req.params.id
		const formData = req.body
		const updatedPost = await postService.updatePost({ id: postId }, formData)
		const responseData = updatedPost

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}

	deletePost = async (req: Request, res: Response) => {
		const postId = req.params.id
		const responseData = await postService.deletePost(postId)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}
}

export default new PostController()
