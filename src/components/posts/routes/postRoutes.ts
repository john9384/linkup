import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import isAuthenticated from '../../../library/middlewares/authentication'
import postController from '../controllers/postController'

const postRouter = Router()

postRouter.get('/', isAuthenticated, catchErrors(postController.getPosts))
postRouter.get('/:id', isAuthenticated, catchErrors(postController.getPostById))
postRouter.post('/', isAuthenticated, catchErrors(postController.createPost))
postRouter.put('/:id', isAuthenticated, catchErrors(postController.updatePost))
postRouter.delete('/:id', isAuthenticated, catchErrors(postController.deletePost))
// postRouter.put('/upload/bg-img', isAuthenticated, catchErrors(postController.uploadBgImg))
// postRouter.put('/upload/avatar', isAuthenticated, catchErrors(postController.uploadAvatar))
// postRouter.delete('/:id' isAuthenticated, catchErrors(postController.deletePost))

export default postRouter
