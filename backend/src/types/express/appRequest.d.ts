import { Express } from 'express'

declare module 'express-serve-static-core' {
	export interface Request {
		userId?: string
		userEmail?: string
	}
}
