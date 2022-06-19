import { IRequest, IResponse } from '../../../app/types/http'
import { CREATED, OK } from '../../../library/constants/http-status'
import { buildResponse } from '../../../library/utils/response-builder'
import * as authService from '../services'
import { ILogin, ISignup } from '../types/forms'

export const signup = async (req: IRequest<ISignup>, res: IResponse) => {
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

export const login = async (req: IRequest<ILogin>, res: IResponse) => {
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
