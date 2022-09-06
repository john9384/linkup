import { IUser } from '../user'
import {
	ISignup,
	ILogin,
	IForgotPassword,
	IAuthToken,
	IResetPassword,
} from './IAuthDTO'

export interface ILoginService {
	email: string
	token: string
}
export interface IAuthService {
	signup(payload: ISignup): Promise<Partial<IUser>>
	verifyEmail(payload: { token: string }): Promise<Partial<IUser>>
	login(payload: ILogin): Promise<ILoginService>
	forgotPassword(payload: IForgotPassword): Promise<Partial<IUser>>
	verifyToken(payload: IAuthToken): Promise<Partial<IUser>>
	resetPassword(payload: IResetPassword): Promise<{ message: string }>
}
