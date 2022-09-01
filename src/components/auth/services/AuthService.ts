import { BAD_REQUEST } from '../../../library/constants/http-status'
import { bcryptCompare, bcryptEncode } from '../../../library/helpers/bcrypt'
import { ValidationError, CustomError } from '../../../library/helpers/error'
import { jwtEncode } from '../../../library/helpers/jwt'
import userRepository from '../../user/repositories/userRepository'
import { otpService } from '../../otp'
import { otpIsValid } from '../../otp/utils/is-valid-otp'
import { userService } from '../../user'
import { IUser } from '../../user/types/model'
import { ISignup, ILogin } from '../types/forms'
import { IAuthService } from '../../../types/auth'
import {
	IAuthToken,
	IForgotPassword,
	IResetPassword,
} from '../../../types/auth/IAuthDTO'

class AuthService implements IAuthService {
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

	public async login(
		formData: ILogin,
	): Promise<{ email: string | undefined; token: string }> {
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
			email: user.email,
			token: encodedData,
		}
	}

	public async verifyEmail(formData: IAuthToken): Promise<Partial<IUser>> {
		const otp = await otpIsValid(formData.token)

		await userRepository.updateUser(
			{ email: otp.transporter },
			{ emailVerified: true },
		)

		return {
			email: otp.transporter,
		}
	}

	public async forgotPassword(
		formData: IForgotPassword,
	): Promise<{ email: string; message: string }> {
		const userExist = await userRepository.fetchOneUser({
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

	public async verifyToken(formData: IAuthToken): Promise<Partial<IUser>> {
		const otp = await otpIsValid(formData.token)

		return {
			email: otp.transporter,
		}
	}

	public async resetPassword(
		formData: IResetPassword,
	): Promise<{ message: string }> {
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

export const authService = new AuthService()
