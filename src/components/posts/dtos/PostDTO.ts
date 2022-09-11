import { userService } from '../../user'

import {
	ICreatePost,
	IDestroyPost,
	IPostDTO,
	IReadPost,
	IUpdatePost,
} from '../../../types/post/IPostDTO'

export class PostDTO implements IPostDTO {
	public read(payload?: IReadPost): Partial<IReadPost> {
		if (payload?.hasOwnObject('userId')) return { userId: payload.userId }
		if (payload?.hasOwnObject('id')) return { id: payload?.id }

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
		const { content } = payload
		return {
			content,
		}
	}

	public destroy(payload: IDestroyPost): IDestroyPost {
		return {
			id: payload.id,
		}
	}
}

export const postDTO = new PostDTO()
