import { UNAUTHORIZED } from '../constants/http-status'
import { jwtDecode } from '../helpers/jwt'
import { IRequest, IResponse, INext } from '../../app/types/http'
import { CustomError } from '../helpers/error'
import { buildResponse } from '../utils/response-builder'

const isAuthenticated = async (req: IRequest, res: IResponse, next: INext) => {
	if (!req.header('Authorization')) {
		throw new CustomError({
			message: 'Unauthorized',
			status: UNAUTHORIZED,
		})
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

export default isAuthenticated
