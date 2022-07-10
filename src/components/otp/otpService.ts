import Logger from '../../library/helpers/loggers'
// import { sendMail } from '../../../library/helpers/mail'
import { validateFormData } from '../../library/utils/validate-form-data'
import { ICreateOtp } from './types/formTypes'
import { IOtp } from './types/modelTypes'
import { VOtp } from './utils/validators'
import otpRepository from './otpRepository'
import { otpIsValid } from './utils/is-valid-otp'
import { ValidationError } from '../../library/helpers/error'
import { BAD_REQUEST } from '../../library/constants/http-status'

class OtpService {
	request = async (formData: ICreateOtp): Promise<object> => {
		validateFormData(VOtp, formData)

		const { userId, transporter, transporterType, instance } = formData

		if (transporterType && !['EMAIL', 'PHONE'].includes(transporterType)) {
			throw new ValidationError({
				message:
					'Invalid transporterType. transporterType is either EMAIL or PHONE',
				status: BAD_REQUEST,
			})
		}

		const otp = await otpRepository.fetchOneOtp({
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
			Logger.info('Phone otp not supported')
		}

		// sendMail({
		// 	mailContent: 'otp',
		// 	content: otp.token || '',
		// 	subject: 'Kago OTP service',
		// 	to: otp.transporter,
		// })

		return { [transporterType.toLowerCase()]: transporter }
	}

	validate = async (token: string): Promise<boolean> => {
		const otp = await otpIsValid(token)
		await otpRepository.destroy({ token: otp.token })
		return true
	}
}

export default new OtpService()
