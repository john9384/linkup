import _ from 'lodash'
import { postRepository } from '../repositories'
import { IPostService } from '../../../types/post/IPostService'
import {
	ICreatePost,
	IDeletePost,
	IReadPost,
	IUpdatePost,
} from 'types/post/IPostDTO'
import { IPost } from 'types/post/IPost'
import { postPresenter } from '../presenters/PostPresenter'
import { postDTO } from '../dtos/PostDTO'

class PostService implements IPostService {
	public async fetch(query?: IReadPost): Promise<Array<Partial<IPost>> | null> {
		const dto = postDTO.read(query)

		const pagination = _.pick(query, ['page', 'limit'])

		const { page, limit } = pagination
		const posts = await postRepository.fetchAndPaginate(dto, { page, limit })

		return posts.map(post => postPresenter.serialize(post, []))
	}

	public async read(query: IReadPost): Promise<Partial<IPost> | null> {
		const dto = postDTO.read(query)
		const post = await postRepository.read(dto)

		return post ? postPresenter.serialize(post, []) : null
	}

	public async create(data: ICreatePost): Promise<Partial<IPost>> {
		const dto = await postDTO.create(data)
		const newPost = await postRepository.create(dto)

		return postPresenter.serialize(newPost, [])
	}

	public async update(
		query: IReadPost,
		data: IUpdatePost,
	): Promise<Partial<IPost>> {
		const readDto = postDTO.read(query)
		const updateDto = postDTO.update(data)

		const post = await postRepository.update(readDto, updateDto)
		return postPresenter.serialize(post, [])
	}

	public async delete(query: IDeletePost): Promise<boolean> {
		const dto = postDTO.delete(query)
		await postRepository.delete(dto)

		return true
	}
}

export const postService = new PostService()
