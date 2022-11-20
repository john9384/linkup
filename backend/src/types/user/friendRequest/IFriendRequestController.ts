import { Request, Response } from 'express'

export interface IFriendRequestController {
	index(req: Request, res: Response): any
	show(req: Request, res: Response): any
	accept(req: Request, res: Response): any
	decline(req: Request, res: Response): any
}
