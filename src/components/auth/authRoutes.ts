import { Router } from 'express'
import catchErrors from '../../library/utils/error-boundary'
import authController from './authController'

const authRouter = Router()

authRouter.post('/signup', catchErrors(authController.signup))
authRouter.post('/login', catchErrors(authController.login))
authRouter.post('/verify-email', catchErrors(authController.verifyEmail))
authRouter.post('/forgot-password', catchErrors(authController.forgotPassword))
authRouter.post('/verify-token', catchErrors(authController.verifyToken))
authRouter.post('/reset-password', catchErrors(authController.resetPassword))

export default authRouter
