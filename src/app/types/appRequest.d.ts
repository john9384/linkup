import { Request } from 'express'

interface User {
	id: string
	email?: string
}

declare interface ProtectedRequest extends Request {
	userId: string
	user: User
}

declare interface Tokens {
	accessToken: string
	refreshToken: string
}
