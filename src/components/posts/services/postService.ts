import { IPost } from '../types/modelTypes'
import { ICreatePost, IQueryPost, IUpdatePost } from '../types/formTypes'
import postRepository from '../repositories/postRepository'
import { PaginationOptions } from '../../../db/repository/types'
import { userService } from '../../user/services/UserService'

class PostService {
	fetchPosts = async (
		query?: IQueryPost,
		pagination?: PaginationOptions,
	): Promise<IPost[] | null> => {
		if (pagination) {
			const { page, limit } = pagination
			const posts = await postRepository.fetchPosts(query, { page, limit })

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
		const userPayload = await userService.fetchOneUser({ id: data.userId }, [
			'firstname',
			'lastname',
			'username',
			'avatar',
		])
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

	toggleLikePost = async (postId: string, userId: string) => {
		let post = await postRepository.fetchOnePost({ id: postId })
		if (!post) throw new Error('Post not found')

		if (post.likes.includes(userId)) {
			post.likes = post.likes.filter((id: string) => id !== userId)
			const updatedPost = await postRepository.updatePost(
				{ id: postId },
				{ likes: post.likes },
			)
			return updatedPost
		}

		post.likes.push(userId)
		const updatedPost = await postRepository.updatePost(
			{ id: postId },
			{ likes: post.likes },
		)

		return updatedPost
	}

	deletePost = async (id: string) => {
		await postRepository.deletePost(id)

		return {
			message: 'post deleted',
		}
	}
}

export default new PostService()
