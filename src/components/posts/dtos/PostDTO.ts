import { userService } from '../../user'
import {
	ICreatePost,
	IDeletePost,
	IPostDTO,
	IReadPost,
	IUpdatePost,
} from '../../../types/post/IPostDTO'

export class PostDTO implements IPostDTO {
	public read(payload?: IReadPost): Partial<IReadPost> {
		if (!payload) return {}
		const { userId, id } = payload

		if (userId) return { userId }
		if (id) return { id }

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
			videos: [],
		}
	}

	public update(payload: IUpdatePost): IUpdatePost {
		const { content, likes } = payload
		return {
			content,
			likes,
		}
	}

	public delete(payload: IDeletePost): IDeletePost {
		return {
			id: payload.id,
		}
	}
}

export const postDTO = new PostDTO()
