import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED } from '../constants/http-status'
import { jwtDecode } from '../helpers/jwt'
import { buildResponse } from '../utils/response-builder'

const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.header('Authorization')) {
		throw new Error('Unauthorized')
		// throw new Error({
		// 	message: 'Unauthorized',
		// 	status: UNAUTHORIZED,
		// })
	}

	const token: string = req?.header('Authorization')?.split(' ')[1] || ''

	try {
		const decoded: any = jwtDecode(token)
		req.user = {
			id: decoded.userId,
			email: decoded.email,
		}

		next()
	} catch (error: any) {
		return res.status(UNAUTHORIZED).send(
			buildResponse({
				success: true,
				message: error.message,
				data: {},
			}),
		)
	}
}

export { isAuthenticated as isAuthenticated }
