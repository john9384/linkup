import Logger from '../../../library/helpers/loggers'
// import { sendMail } from '../../../library/helpers/mail'
import { validateFormData } from '../../../library/utils/validate-form-data'
import { ICreateOtp } from '../types/dtos'
import { IOtp } from '../types/model'
import { VOtp } from '../utils/validators'
import otpRepository from '../repositories'
import { otpIsValid } from '../utils/is-valid-otp'

export const request = async (formData: ICreateOtp): Promise<object> => {
	validateFormData(VOtp, formData)

	const { userId, transporter, transporterType } = formData
	const otp: IOtp = await otpRepository.create({
		userId,
		transporter,
		transporterType,
	})

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

export const validate = async (token: string): Promise<boolean> => {
	const otp = await otpIsValid(token)
	await otpRepository.destroy({ token: otp.token })
	return true
}
