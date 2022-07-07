import { Request, Response, NextFunction } from 'express'

interface User {
	id: string
	email: string
}
export interface IRequest<T = null> extends Request {
	user?: User
	body: T
}

export interface IResponse extends Response {
	[key: string]: any
}

export interface INext extends NextFunction {
	[key: string]: any
}
