import { generateOTP } from '../otp-generator'

describe('utils', () => {
	describe('otp-generator', () => {
		it('should generate a valid OTP', () => {
			const otp = generateOTP()
			const expiryTime = Date.now() + 300000

			expect(otp.token).toBeDefined()
			expect(otp.expiryTime).toBeDefined()
			expect(otp.token).toHaveLength(6)
			expect(otp.expiryTime).toEqual(String(expiryTime))
		})
	})
})
