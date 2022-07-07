import { IRequest, IResponse } from '../../app/types/http'
import { CREATED, OK } from '../../library/constants/http-status'
import { buildResponse } from '../../library/utils/response-builder'
import authService from './authService'
import { ILogin, ISignup } from './types/forms'

class AuthController {
	signup = async (req: IRequest<ISignup>, res: IResponse) => {
		const formData = req.body

		const responseData = await authService.signup(formData)

		return res.status(CREATED).send(
			buildResponse({
				success: true,
				message: 'User signup',
				data: responseData,
			}),
		)
	}

	login = async (req: IRequest<ILogin>, res: IResponse) => {
		const formData = req.body

		const responseData = await authService.login(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User logged in',
				data: responseData,
			}),
		)
	}

	verifyEmail = async (req: IRequest, res: IResponse) => {
		const formData = req.body

		const responseData = await authService.verifyEmail(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User Email verified',
				data: responseData,
			}),
		)
	}

	forgotPassword = async (req: IRequest, res: IResponse) => {
		const formData = req.body

		const responseData = await authService.forgotPassword(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User logged in',
				data: responseData,
			}),
		)
	}

	verifyToken = async (req: IRequest, res: IResponse) => {
		const formData = req.body

		const responseData = await authService.verifyToken(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User logged in',
				data: responseData,
			}),
		)
	}

	resetPassword = async (req: IRequest, res: IResponse) => {
		const formData = req.body

		const responseData = await authService.resetPassword(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User logged in',
				data: responseData,
			}),
		)
	}
}

export default new AuthController()
