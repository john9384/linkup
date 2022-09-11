import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import { isAuthenticated } from '../../../library/middlewares'
import postController from '../controllers/PostController'

const postRouter = Router()

postRouter.get('/', isAuthenticated, catchErrors(postController.index))
postRouter.get('/:id', isAuthenticated, catchErrors(postController.show))
postRouter.post('/', isAuthenticated, catchErrors(postController.create))
postRouter.put('/:id', isAuthenticated, catchErrors(postController.update))
postRouter.delete('/:id', isAuthenticated, catchErrors(postController.destroy))

export default postRouter
