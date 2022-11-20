import { Request, Response } from 'express'
export interface ICommentController {
	index(req: Request, res: Response): any
	create(req: Request, res: Response): any
	update(req: Request, res: Response): any
	delete(req: Request, res: Response): any
}
