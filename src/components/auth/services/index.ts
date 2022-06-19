import { validateFormData } from '../../../library/utils/validate-form-data'
import { jwtEncode } from '../../../library/helpers/jwt'
import { bcryptCompare, bcryptEncode } from '../../../library/helpers/bcrypt'
import { ValidationError } from '../../../library/helpers/error'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import { userService } from '../../user'
import { ISignup, ILogin } from '../types/forms'
import { VSignup, VLogin } from '../utils/validators'

export const signup = async (formData: ISignup) => {
	validateFormData(VSignup, formData)

	const password = await bcryptEncode(formData.password)
	const { firstName, lastName, email } = formData

	const newUser = await userService.createUser({
		firstName,
		lastName,
		email,
		password,
	})

	return { email: newUser.email }
}

export const login = async (formData: ILogin) => {
	validateFormData(VLogin, formData)

	const { email, password } = formData
	const user = await userService.fetchUser({ email })

	const passwordValid = await bcryptCompare(password, user?.password || '')
	if (!passwordValid) {
		throw new ValidationError({
			message: 'Invalid password',
			status: BAD_REQUEST,
		})
	}

	const encodedData = jwtEncode({ userId: user?.id, email: user?.email })

	return {
		email: user?.email,
		token: encodedData,
	}
}
