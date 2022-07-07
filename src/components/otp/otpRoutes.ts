import { Router } from 'express'
import otpController from './otpController'

const otpRouter = Router()

otpRouter.post('/request', otpController.requestOtp)
otpRouter.post('/validate', otpController.validateOtp)

export default otpRouter
