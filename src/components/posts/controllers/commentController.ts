import { Request, Response } from 'express'
import { commentService } from '../services'
import { ICommentController } from '../../../types/post/ICommentController'
import { SuccessResponse } from '../../../library/helpers/response'

class CommentController implements ICommentController {
	public async index(req: Request, res: Response): Promise<any> {
		const responseData = await commentService.fetch(req.query)
		return new SuccessResponse('Posts fetched', responseData).send(res)
	}

	public async create(req: Request, res: Response) {
		const userId = req.userId
		const { postId, content } = req.body
		const responseData = await commentService.create({
			userId,
			postId,
			content,
		})

		return new SuccessResponse('Post Created', responseData).send(res)
	}

	public async update(req: Request, res: Response) {
		const postId = req.params.id
		const formData = req.body

		const responseData = await commentService.update({ id: postId }, formData)

		return new SuccessResponse('Post Updated', responseData).send(res)
	}

	public async delete(req: Request, res: Response) {
		const postId = req.params.id
		const responseData = await commentService.delete({ id: postId })

		return new SuccessResponse('Post Deleted', responseData).send(res)
	}
}

export const commentController = new CommentController()
