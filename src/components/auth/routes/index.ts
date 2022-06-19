import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import * as authController from '../controllers'

const authRouter = Router()

authRouter.post('/signup', catchErrors(authController.signup))
authRouter.post('/login', catchErrors(authController.login))

export default authRouter
