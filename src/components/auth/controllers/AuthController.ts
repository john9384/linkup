import { Request, Response } from 'express'
import { authService } from '../services'
import { OK } from '../../../library/constants/http-status'
import { buildResponse } from '../../../library/utils/response-builder'
import { IAuthController } from '../../../types/auth'
import { userService } from '../../user'
import { SuccessResponse } from '../../../library/helpers'

class AuthController implements IAuthController {
	public async signup(req: Request, res: Response) {
		const formData = req.body

		console.log('Gets here', formData)
		const responseData = await authService.signup(formData)
		console.log(responseData)
		return new SuccessResponse('User Signed up', responseData).send(res)
	}

	public async verifyEmail(req: Request, res: Response) {
		const responseData = await authService.verifyEmail(req.body)

		return new SuccessResponse('User Email verified', responseData).send(res)
	}

	public async login(req: Request, res: Response) {
		const responseData = await authService.login(req.body)

		return new SuccessResponse('User logged in', responseData).send(res)
	}

	public async forgotPassword(req: Request, res: Response) {
		const formData = req.body

		const responseData = await authService.forgotPassword(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Successful',
				data: responseData,
			}),
		)
	}

	public async verifyToken(req: Request, res: Response) {
		const formData = req.body

		const responseData = await authService.verifyToken(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Token verified',
				data: responseData,
			}),
		)
	}

	public async resetPassword(req: Request, res: Response) {
		const formData = req.body

		const responseData = await authService.resetPassword(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Password Reset successful',
				data: responseData,
			}),
		)
	}

	public async currentUser(req: Request, res: Response) {
		const userId = req.user?.id

		const user = await userService.fetchOneUser({ id: userId })
		const responseData = user

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}
}

export const authController = new AuthController()
