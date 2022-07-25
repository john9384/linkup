import { IPost } from '../types/modelTypes'
import { ICreatePost, IQueryPost, IUpdatePost } from '../types/formTypes'
import postRepository from '../repositories/postRepository'
import profileService from '../../user/services/profileService'
import { PaginationOptions } from '../../../db/repository/types'

class PostService {
	fetchPosts = async (
		query?: IQueryPost,
		pagination?: PaginationOptions,
	): Promise<IPost[] | null> => {
		if (pagination) {
			const { page, limit } = pagination
			const posts = await postRepository.fetchAndPaginate<IQueryPost, IPost[]>(
				query,
				{ page, limit },
			)

			return posts
		}

		const posts = await postRepository.fetchPosts(query)
		return posts
	}

	fetchOnePost = async (query: IQueryPost): Promise<IPost | null> => {
		const post = await postRepository.fetchOnePost(query)

		return post
	}

	createPost = async (data: ICreatePost): Promise<IPost> => {
		const userPayload = await profileService.fetchOneProfile(
			{ id: data.userId },
			['fullname', 'username', 'avatar'],
		)
		const newPost = await postRepository.createPost({
			user: userPayload,
			...data,
		})

		return newPost
	}

	updatePost = async (
		query: IQueryPost,
		data: IUpdatePost,
	): Promise<IPost | null> => {
		const post = await postRepository.updatePost(query, data)
		return post
	}

	deletePost = async (id: string) => {
		await postRepository.deletePost(id)

		return {
			message: 'post deleted',
		}
	}
}

export default new PostService()
