import { FindOptionsWhere } from 'typeorm'
import { User } from '../models/User'

export interface ICreateUser {
	firstName: string
	lastName: string
	email: string
	password: string
	username?: string
}

export interface IUpdateUser {}

export interface IQueryUser extends FindOptionsWhere<User> {
	id?: string
	email?: string
}
