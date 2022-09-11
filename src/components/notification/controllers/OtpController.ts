import { Request, Response } from 'express'
import { SuccessResponse } from '../../../library/helpers/response'
import { otpService } from '../services/OtpService'

class OtpController {
	requestOtp = async (req: Request, res: Response) => {
		const formData = req.body
		const responseData = await otpService.request(formData)

		return new SuccessResponse('OTP requested', responseData).send(res)
	}

	validateOtp = async (req: Request, res: Response) => {
		const formData = req.body
		const responseData = await otpService.validate(formData.token)

		return new SuccessResponse('OTP validated', responseData).send(res)
	}
}

export const otpController = new OtpController()
