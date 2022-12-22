import { PaginationOptions } from '../../db/repository/types'
import { IPost } from './IPost'
import { ICreatePost, IDeletePost, IReadPost, IUpdatePost } from './IPostDTO'

export interface IPostService {
	fetch(
		query?: IReadPost,
		pagination?: PaginationOptions,
	): Promise<Array<Partial<IPost>> | null>
	create(payload: ICreatePost): Promise<Partial<IPost>>
	read(query: IReadPost): Promise<Partial<IPost> | null>
	update(query: IReadPost, payload: IUpdatePost): Promise<Partial<IPost>>
	delete(query: IDeletePost): Promise<boolean>
}
