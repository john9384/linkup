import { IBaseRepository } from '../db'
import { IPost } from './IPost'
import { IReadPost, ICreatePost, IUpdatePost, IDestroyPost } from './IPostDTO'
import { PaginationOptions } from '../../db/repository/types'

export interface IPostRepository extends IBaseRepository {
	fetchPosts(
		query?: IReadPost,
		pageOptions?: PaginationOptions,
	): Promise<IPost[]>
	createPost(query?: ICreatePost): Promise<IPost>
	readPost(query?: IReadPost): Promise<IPost | null>
	updatePost(query: IReadPost, data: IUpdatePost): Promise<IPost>
	destroyPost(query: IDestroyPost): Promise<boolean>
}
