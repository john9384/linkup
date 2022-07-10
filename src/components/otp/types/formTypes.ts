export interface ICreateOtp {
	userId: string
	transporter: string
	transporterType: string
	instance: 'SIGNUP' | 'LOGIN'
	token?: string
	tokenExpires?: string
}

export interface IValidateOtp {
	token: string
}

export interface IQueryOtp {
	id?: string
	userId?: string
	transporter?: string
	transporterType?: string
	token?: string
	instance?: string
}
