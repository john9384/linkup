import { Document } from 'mongoose'

export interface IUser {
	id: string
	firstname: string
	lastname: string
	email: string
	password: string
	gender?: string
	phone?: string
	username?: string
	avatar?: string
	bgImgUrl?: string
	religion?: string
	location?: string
	emailVerified?: boolean
	phoneVerified?: boolean
}