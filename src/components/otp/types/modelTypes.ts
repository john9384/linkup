export interface IOtp {
	id?: string
	userId?: string
	transporter?: string
	transporterType?: string
	instance?: 'LOGIN' | 'SIGNUP'
	token?: string
	tokenExpires?: string
}
