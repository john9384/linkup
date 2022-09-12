import _ from 'lodash'
import { IPost } from 'src/types/post/IPost'
import { IPostPresenter } from 'src/types/post/IPostPresenter'

class PostPresenter implements IPostPresenter {
	public serialize(
		postDocument: IPost,
		selectors: Array<keyof IPost> = [],
	): Partial<IPost> {
		const postEntity = {
			id: postDocument._id,
			userId: postDocument.userId,
			user: postDocument.user,
			content: postDocument.content,
			images: postDocument.images,
			likes: postDocument.likes,
			comments: postDocument.comments,
			commentCount: postDocument.commentCount,
		}

		return selectors.length > 0 ? _.pick(postEntity, selectors) : postEntity
	}
}

export const postPresenter = new PostPresenter()
