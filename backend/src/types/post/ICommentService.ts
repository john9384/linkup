import { PaginationOptions } from '../../db/repository/types'
import { IComment } from './IComment'
import {
	ICreateComment,
	IDeleteComment,
	IReadComment,
	IUpdateComment,
} from './ICommentDTO'

export interface ICommentService {
	fetch(
		query?: IReadComment,
		pagination?: PaginationOptions,
	): Promise<Array<Partial<IComment>> | null>
	create(payload: ICreateComment): Promise<Partial<IComment>>
	read(query: IReadComment): Promise<Partial<IComment> | null>
	update(
		query: IReadComment,
		payload: IUpdateComment,
	): Promise<Partial<IComment>>
	delete(query: IDeleteComment): Promise<boolean>
}
