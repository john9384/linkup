import _ from 'lodash'
import { IPost, IPostPresenter } from '../../../types/post'

class PostPresenter implements IPostPresenter {
	public serialize(
		postDocument: IPost | null,
		selectors: Array<keyof IPost> = [],
	): Partial<IPost> {
		if (!postDocument) return {}

		const postEntity = {
			id: postDocument.id,
			userId: postDocument.userId,
			user: postDocument.user,
			content: postDocument.content,
			images: postDocument.images,
			videos: postDocument.videos,
			likes: postDocument.likes,
			comments: postDocument.comments,
			commentCount: postDocument.commentCount,
		}

		return selectors.length > 0 ? _.pick(postEntity, selectors) : postEntity
	}
}

export const postPresenter = new PostPresenter()
