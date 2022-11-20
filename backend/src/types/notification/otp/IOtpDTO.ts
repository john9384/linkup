export interface ICreateOtp {
	// userId: string
	// transporter: string
	// transporterType: string
	// instance: 'SIGNUP' | 'LOGIN'
	// token?: string
	// tokenExpires?: string
	[key: string]: any
}

export interface IValidateOtp {
	token: string
}

export interface IReadOtp {
	id?: string
	userId?: string
	transporter?: string
	transporterType?: string
	token?: string
	instance?: string
}
