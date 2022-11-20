import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import { isAuthenticated } from '../../../library/middlewares'
import commentController from '../controllers/PostController'

const commentRouter = Router()

commentRouter.get('/', isAuthenticated, catchErrors(commentController.index))
commentRouter.get('/:id', isAuthenticated, catchErrors(commentController.show))
commentRouter.post('/', isAuthenticated, catchErrors(commentController.create))
commentRouter.put(
	'/:id',
	isAuthenticated,
	catchErrors(commentController.update),
)
commentRouter.delete(
	'/:id',
	isAuthenticated,
	catchErrors(commentController.delete),
)

export { commentRouter }
