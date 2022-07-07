import BaseRepository from '../../../db/repository/BaseRepository'
import { Post } from '../models/Post'
import { ICreatePost, IUpdatePost, IQueryPost } from '../types/formTypes'
import { IPost } from '../types/modelTypes'

class PostRepository extends BaseRepository {
	fetchPosts = async (query?: IQueryPost): Promise<IPost[] | null> => {
		const users = await this.fetch<IQueryPost, IPost[]>(query)
		return users
	}
	fetchOnePost = async (query: IQueryPost): Promise<IPost | null> => {
		const user = await this.fetchOne<IQueryPost, IPost>(query)
		return user
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
}

const userRepository = new PostRepository(Post)

export default userRepository
