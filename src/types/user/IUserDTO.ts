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
}

export interface IDestroyUser {
	[key: string]: any
}
export interface IUserDTO {
	create(payload: ICreateUser): Partial<IUser>
}
