import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import isAuthenticated from '../../../library/middlewares/authentication'
import * as userController from '../controllers'

const userRouter = Router()

userRouter.get('/', isAuthenticated, catchErrors(userController.getCurrentUser))

export default userRouter
