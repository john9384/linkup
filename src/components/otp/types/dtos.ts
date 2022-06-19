import { FindOptionsWhere } from 'typeorm'
import { Otp } from '../models/Otp'

export interface ICreateOtp {
	userId: string
	transporter: string
	transporterType: string
	token?: string
	tokenExpires?: string
}

export interface IValidateOtp {
	token: string
}

export interface IQueryOtp extends FindOptionsWhere<Otp> {
	userId?: string
	transporter?: string
	transporterType?: string
	token?: string
}
