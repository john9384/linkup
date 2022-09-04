import { ICreateUser } from '../../components/user/types/dtos'
export interface ISignup {
	firstname: string
	lastname: string
	email: string
	password: string
	confirmPassword: string
}

export interface ILogin {
	email: string
	password: string
}

export interface IAuthToken {
	token: string
}

export interface IForgotPassword {
	email: string
}

export interface IResetPassword {
	email: string
	newPassword: string
	confirmPassword: string
}

export interface IAuthDTO {
	signup: (payload: ISignup) => ICreateUser
	verifyEmail(payload: IAuthToken): IAuthToken
	login(payload: ILogin): ILogin
	forgotPassword(payload: IForgotPassword): IForgotPassword
	verifyToken(payload: IAuthToken): IAuthToken
	resetPassword(payload: IResetPassword): Partial<IResetPassword>
}
