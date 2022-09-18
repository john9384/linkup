import BaseRepository from '../../../db/repository/BaseRepository'
import { IOtp } from '../../../types/notification'
import { IOtpRepository } from '../../../types/notification/otp/IOtpRepository'
import { Otp } from '../models/Otp'

class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {}
export const otpRepository = new OtpRepository(Otp)
