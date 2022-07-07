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

export interface IQueryOtp {
	userId?: string
	transporter?: string
	transporterType?: string
	token?: string
}
