import bcrypt from 'bcryptjs'
import { lowerCase, capitalizeString } from '../../../library/helpers'
import {
	IAuthDTO,
	IAuthToken,
	IForgotPassword,
	ILogin,
	IResetPassword,
	ISignup,
} from '../../../types/auth'

class AuthDTO implements IAuthDTO {
	public signup(payload: ISignup): Partial<ISignup> {
		const { email, firstname, lastname, password } = payload
		const hash = bcrypt.hashSync(password, 10)
		return {
			email: lowerCase(email.trim()),
			firstname: capitalizeString(firstname.trim()),
			lastname: capitalizeString(lastname.trim()),
			password: hash,
		}
	}

	public verifyEmail(payload: IAuthToken): IAuthToken {
		return {
			token: payload.token,
		}
	}
	public login(payload: ILogin): Partial<ILogin> {
		const { email, password } = payload
		return {
			email: lowerCase(email.trim()),
			password,
		}
	}
	public forgotPassword(payload: IForgotPassword): IForgotPassword {
		const { email } = payload
		return {
			email: lowerCase(email.trim()),
		}
	}
	public verifyToken(payload: IAuthToken): IAuthToken {
		return {
			token: payload.token,
		}
	}
	public resetPassword(payload: IResetPassword): IResetPassword {
		const { email, newPassword, confirmPassword } = payload
		return {
			email: lowerCase(email.trim()),
			newPassword,
			confirmPassword,
		}
	}
}

export const authDTO = new AuthDTO()
