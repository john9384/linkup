import {
	ICreateComment,
	IDeleteComment,
	ICommentDTO,
	IReadComment,
	IUpdateComment,
} from '../../../types/post/ICommentDTO'
import _ from 'lodash'

export class CommentDTO implements ICommentDTO {
	public read(payload?: IReadComment): Partial<IReadComment> {
		if (_.isEmpty(payload)) return {}

		if (_.has(payload, 'id')) return { id: payload?.id }
		if (_.has(payload, 'postId')) return { userId: payload.userId }
		if (_.has(payload, 'userId')) return { userId: payload.userId }

		return {}
	}

	public async create(payload: ICreateComment): Promise<ICreateComment> {
		const { userId, postId, content } = payload
		return {
			userId,
			postId,
			content,
		}
	}

	public update(payload: IUpdateComment): IUpdateComment {
		const { content, likes } = payload
		return {
			content,
			likes,
		}
	}

	public delete(payload: IDeleteComment): IDeleteComment {
		return {
			id: payload.id,
		}
	}
}

export const commentDTO = new CommentDTO()
