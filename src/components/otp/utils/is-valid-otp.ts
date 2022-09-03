import * as DATE_UTILS from '../../../library/utils/date-utils'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import otpRepository from '../otpRepository'
import { IOtp } from '../types/modelTypes'
import { TokenExpiredError } from '../../../library/helpers'

export const otpIsValid = async (token: string): Promise<IOtp> => {
	const otp: IOtp | null = await otpRepository.fetchOne({ token })

	if (!otp) {
		throw new TokenExpiredError('Invalid token supplied')
	}
	if (DATE_UTILS.tokenExpired(otp.tokenExpires)) {
		throw new TokenExpiredError('Token expired')
	}

	otp.id && (await otpRepository.destroyOtp({ id: otp.id }))

	return otp
}
