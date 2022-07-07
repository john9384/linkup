import * as DATE_UTILS from '../../../library/utils/date-utils'
import { ValidationError } from '../../../library/helpers/error'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import otpRepository from '../otpRepository'
import { IOtp } from '../types/model'

export const otpIsValid = async (token: string): Promise<IOtp> => {
	const otp: IOtp | null = await otpRepository.fetchOne({ token })

	if (!otp) {
		throw new ValidationError({
			message: 'Invalid token supplied',
			status: BAD_REQUEST,
		})
	}
	if (DATE_UTILS.tokenExpired(otp.tokenExpires)) {
		throw new ValidationError({
			message: 'Token expired',
			status: BAD_REQUEST,
		})
	}

	return otp
}
