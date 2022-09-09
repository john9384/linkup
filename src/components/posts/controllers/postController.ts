import { Request, Response } from 'express'
import { buildResponse } from '../../../library/utils/response-builder'
import { OK } from '../../../library/constants/http-status'
import postService from '../services/postService'

class PostController {
	// TODO
	// add the id property to the post object being returned so it will be accessible in the front end
	getPosts = async (req: Request, res: Response) => {
		const { page, limit } = req.query

		const responseData = await postService.fetchPosts(
			{},
			{ page: Number(page), limit: Number(limit) },
		)

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
		const responseData = await postService.fetchOnePost({ id: postId })

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
		const userId = req.userId
		const { content } = req.body
		const responseData = await postService.createPost({
			userId,
			content,
			images: [],
		})

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
		const responseData = await postService.updatePost({ id: postId }, formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}

	toggleLikePost = async (req: Request, res: Response) => {
		const postId = req.params.id
		const userId = req.userId
		const responseData = await postService.toggleLikePost(postId, userId)

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
