import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import { isAuthenticated } from '../../../library/middlewares/authentication'
import { userController } from '../controllers/UserController'

const userRouter = Router()

userRouter.get('/', isAuthenticated, catchErrors(userController.index))
userRouter.get('/:id', isAuthenticated, catchErrors(userController.show))
userRouter.put('/:id', isAuthenticated, catchErrors(userController.update))
userRouter.delete('/:id', isAuthenticated, catchErrors(userController.delete))

export { userRouter }
