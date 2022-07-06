export interface IUser {
	id: string
	firstname: string
	lastname: string
	email: string
	password?: string
	gender?: string
	phone?: string
	location?: string
	emailVerified?: boolean
	phoneVerified?: boolean
	isVendor?: boolean
	isFreelancer?: boolean
	isBlogger?: boolean
	isPremium?: boolean
	isSubscribed?: boolean
}
