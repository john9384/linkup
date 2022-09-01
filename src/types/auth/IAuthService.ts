import { IUser } from '../../components/user/types/model'
import {
	ISignup,
	ILogin,
	IForgotPassword,
	IAuthToken,
	IResetPassword,
} from './IAuthDTO'

export interface IAuthService {
	signup(payload: ISignup): Promise<Partial<IUser>>
	verifyEmail(payload: { token: string }): Promise<Partial<IUser>>
	login(payload: ILogin): Promise<{ email: string | undefined; token: string }>
	forgotPassword(payload: IForgotPassword): Promise<Partial<IUser>>
	verifyToken(payload: IAuthToken): Promise<Partial<IUser>>
	resetPassword(payload: IResetPassword): Promise<{ message: string }>
}
