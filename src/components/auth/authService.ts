import { jwtEncode } from '../../library/helpers/jwt'
import { bcryptCompare, bcryptEncode } from '../../library/helpers/bcrypt'
import { CustomError, ValidationError } from '../../library/helpers/error'
import { BAD_REQUEST } from '../../library/constants/http-status'

import { userService } from '../user'
import { otpService } from '../otp'
import { ISignup, ILogin } from './types/forms'
import { IUser } from '../user/types/model'
import { otpIsValid } from '../otp/utils/is-valid-otp'
import userRepository from '../user/repositories/userRepository'

class AuthService {
	signup = async (formData: ISignup) => {
		const newUser: IUser = await userService.createUser(formData)

		otpService.request({
			userId: newUser.id,
			transporter: newUser.email,
			transporterType: 'EMAIL',
			instance: 'SIGNUP',
		})

		return { email: newUser.email }
	}

	login = async (formData: ILogin) => {
		const { email, password } = formData
		const user = await userService.fetchOneUser({ email }, [
			'id',
			'email',
			'password',
		])

		if (!user) {
			throw new ValidationError({
				message: 'Invalid Credential, Check the email you inputed',
				status: BAD_REQUEST,
			})
		}

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

	verifyEmail = async (formData: any) => {
		const otp = await otpIsValid(formData.token)

		await userRepository.updateUser(
			{ email: otp.transporter },
			{ emailVerified: true },
		)

		return {
			email: otp.transporter,
		}
	}

	forgotPassword = async (formData: any) => {
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
			instance: 'LOGIN',
		})

		return {
			email: userExist.email,
			message: `Otp sent to your email ${userExist.email}`,
		}
	}

	verifyToken = async (formData: any) => {
		const otp = await otpIsValid(formData.token)

		return {
			email: otp.transporter,
		}
	}

	resetPassword = async (formData: any) => {
		const userExist = await userRepository.fetchOneUser({
			email: formData.email,
		})

		if (!userExist) {
			throw new CustomError({
				message: 'Invalid Email',
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
}

export default new AuthService()
