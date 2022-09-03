import { bcryptCompare, bcryptEncode } from '../../../library/helpers/bcrypt'
import { jwtEncode } from '../../../library/helpers/jwt'
import userRepository from '../../user/repositories/userRepository'
import { otpService } from '../../otp'
import { otpIsValid } from '../../otp/utils/is-valid-otp'
import { userService } from '../../user'
import { IUser } from '../../user/types/model'
import { ISignup, ILogin } from '../types/forms'
import {
	IAuthService,
	IAuthToken,
	IForgotPassword,
	IResetPassword,
} from '../../../types/auth'
import { BadRequestError } from '../../../library/helpers'
import { authDTO } from '../dtos'
import { ILoginService } from '../../../types/auth/IAuthService'

class AuthService implements IAuthService {
	public async signup(formData: ISignup): Promise<Partial<IUser>> {
		const dto = authDTO.signup(formData)
		const newUser: IUser = await userService.createUser(dto)

		otpService.request({
			userId: newUser.id,
			transporter: newUser.email,
			transporterType: 'EMAIL',
			instance: 'SIGNUP',
		})

		return { email: newUser.email }
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

	public async login(formData: ILogin): Promise<ILoginService> {
		const dto = authDTO.login(formData)
		const user = await userService.fetchOneUser({ email: dto.email }, [
			'id',
			'email',
			'password',
		])

		if (!user) {
			throw new BadRequestError(
				'Invalid Credential, Check the email you inputed',
			)
		}

		const passwordValid = bcryptCompare(dto.password, user.password)
		if (!passwordValid) {
			throw new BadRequestError(
				'Invalid Credential, Check the email or password',
			)
		}

		const encodedData = jwtEncode({ userId: user?.id, email: user?.email })

		return {
			email: dto.email,
			token: encodedData,
		}
	}

	public async forgotPassword(
		formData: IForgotPassword,
	): Promise<{ email: string; message: string }> {
		const userExist = await userRepository.fetchOneUser({
			email: formData.email,
		})

		if (!userExist) {
			throw new BadRequestError('Email supplied does not exist')
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
			throw new BadRequestError('Invalid Email')
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
