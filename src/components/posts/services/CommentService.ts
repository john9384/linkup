import _ from 'lodash'
import { commentRepository } from '../repositories'
import { ICommentService } from '../../../types/post/ICommentService'
import {
	ICreateComment,
	IDeleteComment,
	IReadComment,
	IUpdateComment,
	IComment,
} from '../../../types/post'
import { commentPresenter } from '../presenters/CommentPresenter'
import { commentDTO } from '../dtos/CommentDTO'

class CommentService implements ICommentService {
	public async fetch(
		query?: IReadComment,
	): Promise<Array<Partial<IComment>> | null> {
		const dto = commentDTO.read(query)

		const pagination = _.pick(query, ['page', 'limit'])

		const { page, limit } = pagination
		const comments = await commentRepository.fetchAndPaginate(dto, {
			page,
			limit,
		})

		return comments.map((comment: IComment) =>
			commentPresenter.serialize(comment, []),
		)
	}

	public async read(query: IReadComment): Promise<Partial<IComment> | null> {
		const dto = commentDTO.read(query)
		const comment = await commentRepository.read(dto)

		return comment ? commentPresenter.serialize(comment, []) : null
	}

	public async create(data: ICreateComment): Promise<Partial<IComment>> {
		const dto = await commentDTO.create(data)
		const newComment = await commentRepository.create(dto)

		return commentPresenter.serialize(newComment, [])
	}

	public async update(
		query: IReadComment,
		data: IUpdateComment,
	): Promise<Partial<IComment>> {
		const readDto = commentDTO.read(query)
		const updateDto = commentDTO.update(data)

		const comment = await commentRepository.update(readDto, updateDto)
		return commentPresenter.serialize(comment, [])
	}

	public async delete(query: IDeleteComment): Promise<boolean> {
		const dto = commentDTO.delete(query)
		await commentRepository.delete(dto)

		return true
	}
}

export const commentService = new CommentService()
