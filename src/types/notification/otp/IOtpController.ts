import { Request, Response } from 'express'

export interface IOtpController {
	request(req: Request, res: Response): Promise<any>
	validate(req: Request, res: Response): Promise<any>
}
