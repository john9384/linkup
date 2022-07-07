import { IRequest, IResponse } from '../../../app/types/http'
import { buildResponse } from '../../../library/utils/response-builder'
import { OK } from '../../../library/constants/http-status'
import postService from '../services/postService'
import { IUpdatePost } from '../types/formTypes'

class PostController {
	getPosts = async (req: IRequest, res: IResponse) => {
		const users = await postService.fetchPosts()
		// TODO
		// Make room for fetching with query parameters
		// Make room for pagination
		const responseData = users

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Post fetched',
				data: responseData,
			}),
		)
	}

	getPostById = async (req: IRequest, res: IResponse) => {
		const userId = req.params.id
		const user = await postService.fetchOnePost({ id: userId })
		const responseData = user

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}

	updatePost = async (req: IRequest<IUpdatePost>, res: IResponse) => {
		const userId = req.params.id
		const formData = req.body
		const updatedPost = await postService.updatePost({ id: userId }, formData)
		const responseData = updatedPost

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
