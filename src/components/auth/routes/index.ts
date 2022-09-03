import { Router } from 'express'
import { authController } from '../controllers'
import schema from './schemas'
import {
	validator,
	ValidationSource,
	isAuthenticated,
} from '../../../library/middlewares'
import catchErrors from '../../../library/utils/error-boundary'

const authRouter = Router()

authRouter.post(
	'/signup',
	validator(schema.signup),
	catchErrors(authController.signup),
)
authRouter.post(
	'/verify-email',
	validator(schema.verifyEmail),
	catchErrors(authController.verifyEmail),
)
authRouter.post(
	'/login',
	validator(schema.login),
	catchErrors(authController.login),
)
authRouter.post(
	'/forgot-password',
	validator(schema.forgotPassword),
	catchErrors(authController.forgotPassword),
)
authRouter.post(
	'/verify-token',
	validator(schema.verifyPasswordReset),
	catchErrors(authController.verifyToken),
)
authRouter.post(
	'/reset-password',
	validator(schema.resetPassword),
	catchErrors(authController.resetPassword),
)
authRouter.get(
	'/user',
	isAuthenticated,
	catchErrors(authController.currentUser),
)

export { authRouter }
