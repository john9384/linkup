import { Request, Response } from 'express'
import { IFriendRequestController } from 'src/types/user/friendRequest/IFriendRequestController'
import { SuccessResponse } from '../../../library/helpers/response'

class FriendRequestController implements IFriendRequestController {
	index(req: Request, res: Response) {
		const responseData = {}
		return new SuccessResponse('Friend Request sent', responseData).send(res)
	}
	show(req: Request, res: Response) {
		const responseData = {}
		return new SuccessResponse('Friend Request sent', responseData).send(res)
	}
	accept(req: Request, res: Response) {
		const responseData = {}
		return new SuccessResponse('Ok', responseData).send(res)
	}
	decline(req: Request, res: Response) {
		const responseData = {}
		return new SuccessResponse('Ok', responseData).send(res)
	}
}

export const friendRequestController = new FriendRequestController()
