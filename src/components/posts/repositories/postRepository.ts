import BaseRepository from '../../../db/repository/BaseRepository'
import { PaginationOptions } from '../../../db/repository/types'
import { Post } from '../models/Post'
import { ICreatePost, IUpdatePost, IQueryPost } from '../types/formTypes'
import { IPost } from '../types/modelTypes'

class PostRepository extends BaseRepository {
	fetchPosts = async (
		query?: IQueryPost,
		pageOptions?: PaginationOptions,
	): Promise<IPost[] | null> => {
		const limit = pageOptions ? pageOptions.limit : 10
		const page = pageOptions ? pageOptions.page * pageOptions.limit : 0
		const posts = await this.fetchAndPaginate<IQueryPost, IPost[]>(query, {
			page,
			limit,
		})

		return posts
	}
	fetchOnePost = async (query: IQueryPost): Promise<IPost | null> => {
		const post = await this.fetchOne<IQueryPost, IPost>(query)
		return post
	}

	createPost = async (data: ICreatePost): Promise<IPost> => {
		const newPost = await this.create<ICreatePost, IPost>(data)
		return newPost
	}

	updatePost = async (
		query: IQueryPost,
		data: IUpdatePost,
	): Promise<IPost | null> => {
		const updatedPost = await this.update<IQueryPost, IUpdatePost, IPost>(
			query,
			data,
		)

		return updatedPost
	}

	deletePost = async (id: string) => {
		await this.destroy<IQueryPost>({ id })
	}
}

const postRepository = new PostRepository(Post)

export default postRepository
