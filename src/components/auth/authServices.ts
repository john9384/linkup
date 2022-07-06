import { validateFormData } from '../../library/utils/validate-form-data'
import { jwtEncode } from '../../library/helpers/jwt'
import { bcryptCompare, bcryptEncode } from '../../library/helpers/bcrypt'
import { CustomError, ValidationError } from '../../library/helpers/error'
import { BAD_REQUEST } from '../../library/constants/http-status'
import { userService } from '../user'
import { otpService } from '../otp'
import { ISignup, ILogin } from './types/forms'
import { IUser } from '../user/types/model'
import { otpIsValid } from '../otp/utils/is-valid-otp'
import userRepository from '../user/repositories'
import {
	VSignup,
	VLogin,
	VToken,
	VForgotPassword,
	VResetPassword,
} from './utils/validators'

export const signup = async (formData: ISignup) => {
	validateFormData(VSignup, formData)

	const password = await bcryptEncode(formData.password)
	const { firstname, lastname, email } = formData

	const newUser: IUser = await userService.createUser({
		firstname,
		lastname,
		email,
		password,
	})

	otpService.request({
		userId: newUser.id,
		transporter: newUser.email,
		transporterType: 'EMAIL',
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

export const verifyEmail = async (formData: any) => {
	validateFormData(VToken, formData)

	const otp = await otpIsValid(formData.token)

	return {
		email: otp.transporter,
	}
}

export const forgotPassword = async (formData: any) => {
	validateFormData(VForgotPassword, formData)

	const userExist: any = await userRepository.fetchOneUser({
		email: formData.email,
	})

	if (!userExist) {
		throw new CustomError({
			message: 'Email supplied does not exist',
			status: BAD_REQUEST,
		})
	}

	otpService.request({
		userId: userExist.id,
		transporter: userExist.email,
		transporterType: 'EMAIL',
	})

	return {
		email: userExist.email,
		message: `Otp sent to your email ${userExist.email}`,
	}
}

export const verifyToken = async (formData: any) => {
	validateFormData(VToken, formData)

	const otp = await otpIsValid(formData.token)

	return {
		email: otp.transporter,
		token: otp.token,
	}
}

export const resetPassword = async (formData: any) => {
	validateFormData(VResetPassword, formData)

	const otp = await otpIsValid(formData.token)
	const userExist: any = await userRepository.fetchOneUser({
		email: formData.email,
	})

	if (!userExist) {
		throw new CustomError({
			message: 'Invalid Email',
			status: BAD_REQUEST,
		})
	}

	if (otp.transporter !== userExist.email) {
		throw new CustomError({
			message: 'Email and token mismatch',
			status: BAD_REQUEST,
		})
	}

	const { newPassword } = formData
	const password = await bcryptEncode(newPassword)

	await userService.updateUser({ email: userExist.email }, { password })

	return {
		message: 'Password reset successful',
	}
}
