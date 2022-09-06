import { Request, Response } from 'express'
import { userService } from '../services'
import { IUserController } from '../../../types/user'
import { SuccessResponse } from '../../../library/helpers/response'

class UserController implements IUserController {
	public async index(req: Request, res: Response) {
		const query = req.query
		const responseData = await userService.fetchUsers(query)

		return new SuccessResponse('User fetched', responseData).send(res)
	}

	public async show(req: Request, res: Response) {
		const id = req.params.id
		const responseData = await userService.fetchOneUser({ id })

		return new SuccessResponse('User fetched', responseData).send(res)
	}

	public async update(req: Request, res: Response) {
		const id = req.params.id
		const formData = req.body

		const responseData = await userService.updateUser({ id }, formData)

		return new SuccessResponse('User fetched', responseData).send(res)
	}

	public async destroy(req: Request, res: Response) {
		const id = req.params.id
		const responseData = await userService.deleteUser({ id })

		return new SuccessResponse('User fetched', responseData).send(res)
	}
}

export const userController = new UserController()
