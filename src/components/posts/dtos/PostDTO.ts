import { userService } from '../../user'

import {
	ICreatePost,
	IDestroyPost,
	IPostDTO,
	IReadPost,
	IUpdatePost,
} from '../../../types/post/IPostDTO'
import _ from 'lodash'

export class PostDTO implements IPostDTO {
	public read(payload?: IReadPost): Partial<IReadPost> {
		if (_.isEmpty(payload)) return {}

		if (_.has(payload, 'userId')) return { userId: payload.userId }
		if (_.has(payload, 'id')) return { id: payload?.id }

		return {}
	}

	public async create(payload: ICreatePost): Promise<ICreatePost> {
		const { userId, content } = payload
		const user = await userService.read({ id: userId }, [
			'fullname',
			'username',
			'avatar',
		])
		return {
			user,
			userId,
			content,
			images: [],
		}
	}

	public update(payload: IUpdatePost): IUpdatePost {
		const { content, likes } = payload
		return {
			content,
			likes,
		}
	}

	public destroy(payload: IDestroyPost): IDestroyPost {
		return {
			id: payload.id,
		}
	}
}

export const postDTO = new PostDTO()
