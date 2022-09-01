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
	signup: (payload: ISignup) => Partial<ISignup>
	verifyEmail(payload: IAuthToken): IAuthToken
	login(payload: ILogin): Partial<ILogin>
	forgotPassword(payload: IForgotPassword): IForgotPassword
	verifyToken(payload: IAuthToken): IAuthToken
	resetPassword(payload: IResetPassword): IResetPassword
}
