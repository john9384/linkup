import { Request, Response } from 'express'

export interface IAuthController {
	signup (req: Request, res: Response) : any
	verifyEmail (req: Request, res: Response) : any
	login (req: Request, res: Response) : any
	forgotPassword (req: Request, res: Response) : any
	verifyToken (req: Request, res: Response) : any
	resetPassword (req: Request, res: Response) : any
}
