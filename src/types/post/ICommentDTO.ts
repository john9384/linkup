/* eslint-disable no-unused-vars */
import { IComment } from './IComment'

export interface ICreateComment {
	[key: string]: any
}

export interface IUpdateComment {
	[key: string]: any
}

export interface IReadComment {
	[key: string]: any
}

export interface IDeleteComment {
	[key: string]: any
}

export interface ICommentDTO {
	read(payload: IReadComment): Partial<IComment>
	create(payload: ICreateComment): Promise<ICreateComment>
	update(payload: IUpdateComment): IUpdateComment
	delete(payload: IDeleteComment): IDeleteComment
}
