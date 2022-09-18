/* eslint-disable no-unused-vars */
import { IPost } from './IPost'

export interface ICreatePost {
	[key: string]: any
}

export interface IUpdatePost {
	[key: string]: any
}

export interface IReadPost {
	[key: string]: any
}

export interface IDeletePost {
	[key: string]: any
}

export interface IPostDTO {
	read(payload: IReadPost): Partial<IPost>
	create(payload: ICreatePost): Promise<ICreatePost>
	update(payload: IUpdatePost): IUpdatePost
	delete(payload: IDeletePost): IDeletePost
}
