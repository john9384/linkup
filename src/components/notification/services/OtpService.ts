import { logger } from '../../../library/helpers'
import { BadRequestError } from '../../../library/helpers'
import { ICreateOtp, IOtp } from '../../../types/notification'
import { IOtpService } from '../../../types/notification'
import { otpRepository } from '../repositories/OtpRepository'

class OtpService implements IOtpService {
	public async request(formData: ICreateOtp): Promise<Record<string, string>> {
		const { userId, transporter, transporterType, instance } = formData

		if (transporterType && !['EMAIL', 'PHONE'].includes(transporterType)) {
			throw new BadRequestError(
				'Invalid transporterType. transporterType is either EMAIL or PHONE',
			)
		}

		const otp = await otpRepository.read({
			transporter,
			transporterType,
			instance,
		})

		let newOtp

		if (otp) {
			const { token, tokenExpires } = this._generateOtp()
			newOtp = await otpRepository.update(
				{ userId, transporter, transporterType, instance },
				{ token, tokenExpires },
			)
		} else {
			const { token, tokenExpires } = this._generateOtp()
			newOtp = await otpRepository.create({
				userId,
				transporter,
				transporterType,
				instance,
				token,
				tokenExpires,
			} as IOtp)
		}

		if (transporterType === 'PHONE') {
			// Todo otp with phone
			logger.info('Phone otp not supported')
		}

		// sendMail({
		// 	mailContent: 'otp',
		// 	content: otp.token || '',
		// 	subject: 'Kago OTP service',
		// 	to: otp.transporter,
		// })
		logger.info(newOtp)
		return { [transporterType.toLowerCase()]: transporter }
	}

	validate = async (token: string): Promise<IOtp> => {
		const otp = await this._otpIsValid(token)
		await otpRepository.delete({ token: otp.token })
		return otp
	}

	private async _otpIsValid(token: string): Promise<IOtp> {
		const otp: IOtp | null = await otpRepository.read({ token })

		if (!otp) {
			throw new BadRequestError('Invalid Token supplied')
		}
		if (this._tokenExpired(otp.tokenExpires)) {
			throw new BadRequestError('Token Expired')
		}

		await otpRepository.delete({ id: otp.id })

		return otp
	}

	private _tokenExpired(tokenExpires: string) {
		const currTime = Date.now()
		const timeDiff = Number(tokenExpires) - currTime
		if (timeDiff <= 0) return true

		return false
	}
	private _generateOtp(): { token: string; tokenExpires: string } {
		const token = Math.floor(100000 + Math.random() * 900000)
		const tokenExpires = Date.now() + 300000

		return {
			token: String(token),
			tokenExpires: String(tokenExpires),
		}
	}
}

export const otpService = new OtpService()
