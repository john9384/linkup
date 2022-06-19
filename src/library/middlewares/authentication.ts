import { UNAUTHORIZED } from '../constants/http-status'
import { jwtDecode } from '../helpers/jwt'
import { IRequest, IResponse, INext } from '../../app/types/http'
import { CustomError } from '../helpers/error'

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
		throw new CustomError({
			status: 401,
			message: error.message,
		})
	}
}

export default isAuthenticated
