export const generateOTP = (): { token: string; expiryTime: string } => {
	const token = Math.floor(100000 + Math.random() * 900000)
	const expiryTime = Date.now() + 300000

	return {
		token: String(token),
		expiryTime: String(expiryTime),
	}
}
