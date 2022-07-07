import { IRequest, IResponse } from '../../app/types/http'
import { OK } from '../../library/constants/http-status'
import { buildResponse } from '../../library/utils/response-builder'
import otpService from './otpService'
import { ICreateOtp, IValidateOtp } from './types/dtos'

class OtpController {
	requestOtp = async (req: IRequest<ICreateOtp>, res: IResponse) => {
		const formData = req.body
		const responseData = await otpService.request(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Otp requested',
				data: responseData,
			}),
		)
	}

	validateOtp = async (req: IRequest<IValidateOtp>, res: IResponse) => {
		const formData = req.body
		const otpValid = await otpService.validate(formData.token)
		const responseData = {
			otpValid,
		}
		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Success',
				data: responseData,
			}),
		)
	}
}

export default new OtpController()
