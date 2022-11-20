import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import { isAuthenticated } from '../../../library/middlewares/authentication'
import { friendRequestController } from '../controllers'

const friendRequestRouter = Router()

friendRequestRouter.get(
	'/',
	isAuthenticated,
	catchErrors(friendRequestController.index),
)
friendRequestRouter.get(
	'/:id',
	isAuthenticated,
	catchErrors(friendRequestController.show),
)
friendRequestRouter.put(
	'/:id',
	isAuthenticated,
	catchErrors(friendRequestController.accept),
)
friendRequestRouter.put(
	'/:id',
	isAuthenticated,
	catchErrors(friendRequestController.decline),
)

export { friendRequestRouter }
