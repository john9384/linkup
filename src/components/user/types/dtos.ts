export interface ICreateUser {
	firstname: string
	lastname: string
	email: string
	password: string
	username?: string
}

export interface IUpdateUser {
	[key: string]: string | number | boolean
}

export interface IQueryUser {
	id?: string
	email?: string
}
