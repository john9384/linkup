import { Request, Response, NextFunction } from 'express'
import { jwtDecode } from '../helpers/jwt'
import {
	AccessTokenError,
	AuthFailureError,
	TokenExpiredError,
} from '../helpers/error'
import { userService } from '../../components/user/services/UserService'
import { logger } from '../helpers'

const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.header('Authorization')) {
			throw new TokenExpiredError('Token has Expired')
		}

		const token: string = req?.header('Authorization')?.split(' ')[1] || ''
		if (token === '') {
			throw new TokenExpiredError('Token has Expired')
		}

		const decoded: any = jwtDecode(token)
		const user = await userService.fetchOneUser({ email: decoded.email })

		if (!user) {
			logger.error('User not registered or Invalid access token')
			throw new AuthFailureError('User not registered or Invalid access token')
		}

		req.userId = user.id
		req.userEmail = user.email

		return next()
	} catch (error: any) {
		if (error instanceof TokenExpiredError) {
			next(new AccessTokenError(error.message))
		}
		next(error)
	}
}

export { isAuthenticated }
