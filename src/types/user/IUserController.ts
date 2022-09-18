import { Request, Response } from 'express'

export interface IUserController {
	index(req: Request, res: Response): any
	show(req: Request, res: Response): any
	update(req: Request, res: Response): any
	delete(req: Request, res: Response): any
}
