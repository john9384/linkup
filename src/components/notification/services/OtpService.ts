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

		const otp = await otpRepository.readOtp({
			transporter,
			transporterType,
			instance,
		})

		let newOtp

		if (otp) {
			newOtp = await otpRepository.updateOtp({
				transporter,
				transporterType,
			})
		} else {
			newOtp = await otpRepository.createOtp({
				userId,
				transporter,
				transporterType,
				instance,
			})
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

		return { [transporterType.toLowerCase()]: transporter }
	}

	validate = async (token: string): Promise<IOtp> => {
		const otp = await this._otpIsValid(token)
		await otpRepository.destroy({ token: otp.token })
		return otp
	}

	private async _otpIsValid(token: string): Promise<IOtp> {
		const otp: IOtp | null = await otpRepository.readOtp({ token })

		if (!otp) {
			throw new BadRequestError('Invalid Token supplied')
		}
		if (this._tokenExpired(otp.tokenExpires)) {
			throw new BadRequestError('Token Expired')
		}

		await otpRepository.destroyOtp({ id: otp.id })

		return otp
	}

	private _tokenExpired(tokenExpires: string) {
		const currTime = Date.now()
		const timeDiff = Number(tokenExpires) - currTime
		if (timeDiff <= 0) return true

		return false
	}
}

export const otpService = new OtpService()
