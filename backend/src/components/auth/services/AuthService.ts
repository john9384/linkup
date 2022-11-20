import { bcryptCompare } from '../../../library/helpers/bcrypt'
import { jwtEncode } from 'library/helpers/jwt'
import { userRepository } from '../../user/repositories'
import { userService } from '../../user'
import {
	IAuthService,
	IAuthToken,
	IForgotPassword,
	ILogin,
	IResetPassword,
	ISignup,
} from '../../../types/auth'
import { BadRequestError } from '../../../library/helpers'
import { authDTO } from '../dtos'
import { ILoginService } from '../../../types/auth/IAuthService'
import { IUser } from '../../../types/user'
import { otpService } from '../../notification/services/OtpService'

class AuthService implements IAuthService {
	public async signup(formData: ISignup): Promise<Partial<IUser>> {
		const dto = authDTO.signup(formData)
		const newUser = await userService.create(dto)

		otpService.request({
			userId: newUser.id,
			transporter: newUser.email,
			transporterType: 'EMAIL',
			instance: 'SIGNUP',
		})

		return { email: newUser.email }
	}

	public async verifyEmail(formData: IAuthToken): Promise<Partial<IUser>> {
		const dto = authDTO.verifyEmail(formData)
		const otp = await otpService.validate(dto.token)

		await userRepository.update(
			{ email: otp.transporter },
			{ emailVerified: true },
		)

		return {
			email: otp.transporter,
		}
	}

	public async login(formData: ILogin): Promise<ILoginService> {
		const dto = authDTO.login(formData)
		const user = await userService.read({ email: dto.email }, [
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
	): Promise<Partial<IUser>> {
		const dto = authDTO.forgotPassword(formData)
		const userExist = await userService.read(
			{
				email: dto.email,
			},
			['email'],
		)

		if (!userExist) {
			throw new BadRequestError('Email supplied does not exist')
		}

		otpService.request({
			userId: userExist.id,
			transporter: userExist.email,
			transporterType: 'EMAIL',
			instance: 'LOGIN',
		})

		return { email: userExist.email }
	}

	public async verifyToken(formData: IAuthToken): Promise<Partial<IUser>> {
		const dto = authDTO.verifyToken(formData)
		const otp = await otpService.validate(dto.token)

		return {
			email: otp.transporter,
		}
	}

	public async resetPassword(
		formData: IResetPassword,
	): Promise<Partial<IUser>> {
		const dto = authDTO.resetPassword(formData)
		const userExist = await userService.read({ email: dto.email }, [
			'email',
			'password',
		])

		if (!userExist) {
			throw new BadRequestError('Invalid Email')
		}

		await userService.update(
			{ email: userExist.email },
			{ password: dto.newPassword },
		)

		return { email: userExist.email }
	}
}

export const authService = new AuthService()
