import { IUser } from './IUser'

export interface ICreateUser {
	firstname: string
	lastname: string
	email: string
	password: string
	username?: string
}

export interface IUpdateUser {
	[key: string]: any
}

export interface IReadUser {
	id?: string
	email?: string
	username?: string
}

export interface IDeleteUser {
	[key: string]: any
}
export interface IUserDTO {
	read(payload: IReadUser): Partial<IUser>
	create(payload: ICreateUser): Partial<IUser>
	update(payload: IUpdateUser): Partial<IUser>
}
