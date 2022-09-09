import { Request, Response } from 'express'
import { authService } from '../services'
import { IAuthController } from '../../../types/auth'
import { userService } from '../../user'
import { SuccessResponse } from '../../../library/helpers'

class AuthController implements IAuthController {
	public async signup(req: Request, res: Response) {
		const formData = req.body
		const responseData = await authService.signup(formData)

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

		return new SuccessResponse('Token sent to your email', responseData).send(
			res,
		)
	}

	public async verifyToken(req: Request, res: Response) {
		const formData = req.body

		const responseData = await authService.verifyToken(formData)

		return new SuccessResponse('Token Verified', responseData).send(res)
	}

	public async resetPassword(req: Request, res: Response) {
		const formData = req.body

		const responseData = await authService.resetPassword(formData)
		return new SuccessResponse('User Password reset', responseData).send(res)
	}

	public async currentUser(req: Request, res: Response) {
		const userId = req.userId
		const responseData = await userService.fetchOneUser({ id: userId }, [])

		return new SuccessResponse('User fetched', responseData).send(res)
	}
}

export const authController = new AuthController()
