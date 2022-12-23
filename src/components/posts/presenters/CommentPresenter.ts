import _ from 'lodash'
import { IComment, ICommentPresenter } from '../../../types/post'

class CommentPresenter implements ICommentPresenter {
	public serialize(
		commentDocument: IComment | null,
		selectors: Array<keyof IComment> = [],
	): Partial<IComment> {
		if (!commentDocument) return {}
		const postEntity = {
			id: commentDocument.id,
			userId: commentDocument.userId,
			postId: commentDocument.postId,
			content: commentDocument.content,
			likes: commentDocument.likes,
		}

		return selectors.length > 0 ? _.pick(postEntity, selectors) : postEntity
	}
}

export const commentPresenter = new CommentPresenter()
