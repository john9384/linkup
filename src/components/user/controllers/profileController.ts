import { Request, Response } from 'express'
import { buildResponse } from '../../../library/utils/response-builder'
import { OK } from '../../../library/constants/http-status'
import userService from '../services/userService'

class UserController {
	getProfiles = async (req: Request, res: Response) => {
		const users = await userService.fetchUsers()
		// TODO
		// Make room for fetching with query parameters
		// Make room for pagination
		const responseData = users

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User fetched',
				data: responseData,
			}),
		)
	}

	getCurrentUserProfile = async (req: Request, res: Response) => {
		const userId = req.user.id
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

	getProfileById = async (req: Request, res: Response) => {
		const userId = req.params.id
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

	updateProfile = async (req: Request, res: Response) => {
		const userId = req.params.id
		const formData = req.body
		const updatedUser = await userService.updateUser({ id: userId }, formData)
		const responseData = updatedUser

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User updated',
				data: responseData,
			}),
		)
	}
}

export default new UserController()
