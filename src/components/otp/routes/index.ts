import { Router } from 'express'
import * as otpController from '../controllers'

const otpRouter = Router()

otpRouter.post('/request', otpController.requestOtp)
otpRouter.post('/validate', otpController.validateOtp)

export default otpRouter
