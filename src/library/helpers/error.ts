import { IResponseData } from '../utils/response-builder'

export interface IError {
	message: string
	data?: IResponseData
	type?: string
	status?: number
	stack?: string
}

class BaseError extends Error {
	data?: IResponseData
	type: string
	status: number
}

export class CustomError extends BaseError {
	constructor({ message, data, type, status }: IError) {
		super()
		this.type = type || 'CustomError'
		this.message = message
		this.data = data
		this.status = status || 500
	}
}

export class ValidationError extends BaseError {
	constructor({ message, data, status }: IError) {
		super()
		this.type = 'Validation Error'
		this.message = message
		this.data = data
		this.status = status || 500
	}
}

export class DatabaseError extends BaseError {
	constructor({ message, data, status }: IError) {
		super()
		this.type = 'Database Error'
		this.message = message
		this.data = data
		this.status = status || 500
	}
}
