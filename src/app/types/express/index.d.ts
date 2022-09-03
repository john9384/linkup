import { Express } from 'express'

declare module 'express-serve-static-core' {
	interface User {
		id: string
		email?: string
	}
	export interface Request {
		user: User
	}
}
