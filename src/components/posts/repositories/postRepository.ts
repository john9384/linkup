import { IPost } from 'src/types/post/IPost'
import {
	IReadPost,
	ICreatePost,
	IUpdatePost,
	IDestroyPost,
} from 'src/types/post/IPostDTO'
import BaseRepository from '../../../db/repository/BaseRepository'
import { PaginationOptions } from '../../../db/repository/types'
import { Post } from '../models'
import { IPostRepository } from '../../../types/post/IPostRepository'

class PostRepository extends BaseRepository implements IPostRepository {
	fetchPosts = async (
		query?: IReadPost,
		pageOptions?: PaginationOptions,
	): Promise<IPost[]> => {
		const limit = pageOptions?.limit ? Number(pageOptions?.limit) : 10
		const page = pageOptions?.page
			? Number(pageOptions?.page) * Number(pageOptions?.limit)
			: 0
		const posts = await this.fetchAndPaginate<IReadPost, IPost[]>(query, {
			page,
			limit,
		})

		return posts
	}

	readPost = async (query: IReadPost): Promise<IPost | null> => {
		const post = await this.read<IReadPost, IPost>(query)
		return post
	}

	createPost = async (data: ICreatePost): Promise<IPost> => {
		const newPost = await this.create<ICreatePost, IPost>(data)
		return newPost
	}

	updatePost = async (query: IReadPost, data: IUpdatePost): Promise<IPost> => {
		const updatedPost = await this.update<IReadPost, IUpdatePost, IPost>(
			query,
			data,
		)

		return updatedPost
	}

	public async destroyPost(query: IDestroyPost): Promise<boolean> {
		await this.destroy<IDestroyPost>({ id: query.id })
		return true
	}
}

const postRepository = new PostRepository(Post)

export default postRepository
