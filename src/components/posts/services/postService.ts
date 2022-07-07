import { CustomError } from '../../../library/helpers/error'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import { IPost } from '../types/modelTypes'
import { ICreatePost, IQueryPost, IUpdatePost } from '../types/formTypes'
import postRepository from '../repositories/postRepository'

class PostService {
	fetchPosts = async (query?: IQueryPost): Promise<IPost[] | null> => {
		const posts = await postRepository.fetchPosts(query)
		return posts
	}

	fetchOnePost = async (query: IQueryPost): Promise<IPost | null> => {
		const post = await postRepository.fetchOnePost(query)

		return post
	}

	createPost = async (data: ICreatePost): Promise<IPost> => {
		const post = await postRepository.fetchOnePost({ email: data.email })

		if (post) {
			throw new CustomError({
				message: 'Post with email exits',
				status: BAD_REQUEST,
			})
		}
		const newPost = await postRepository.createPost(data)

		return newPost
	}

	updatePost = async (
		query: IQueryPost,
		data: IUpdatePost,
	): Promise<IPost | null> => {
		const post = await postRepository.updatePost(query, data)
		return post
	}
}

export default new PostService()
