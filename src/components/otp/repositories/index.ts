import { ValidationError } from '../../../library/helpers/error'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import { generateOTP } from '../../../library/utils/otp-generator'
import BaseRepository from '../../../db/repository/BaseRepository'
import { IOtp } from '../types/model'
import { Otp } from '../models/Otp'
import { ICreateOtp, IQueryOtp } from '../types/dtos'

class OtpRepository extends BaseRepository {
	fetchOneOtp = async (query: IQueryOtp): Promise<IOtp | null> => {
		const otp = await Otp.findOneBy(query)

		return otp
	}

	createUser = async ({ userId, transporter, transporterType }: ICreateOtp) => {
		if (transporterType && !['EMAIL', 'PHONE'].includes(transporterType)) {
			throw new ValidationError({
				message:
					'Invalid transporterType. transporterType is either EMAIL or PHONE',
				status: BAD_REQUEST,
			})
		}

		const otp = await this.fetchOneOtp({
			transporter,
			transporterType,
		})

		if (otp) {
			const updatedOtp = await this.updateOtp({
				transporter,
				transporterType,
			})

			return updatedOtp
		}

		let { token, expiryTime } = generateOTP()
		let newOtp = await this.create<ICreateOtp, IOtp>({
			userId,
			transporter,
			transporterType,
			token,
			tokenExpires: expiryTime,
		})

		return newOtp
	}

	updateOtp = async (query: IQueryOtp): Promise<IOtp | null> => {
		let otp = await this.fetchOneOtp(query)
		if (otp) {
			let { token, expiryTime } = generateOTP()
			let otpData = { token, tokenExpires: expiryTime }

			otp = await this.update<IQueryOtp, typeof otpData, IOtp>(query, otpData)
		}

		return otp
	}

	destroyOtp = async (query: IQueryOtp) => {
		this.destroy(query)
		return true
	}
}
const otpRepository = new OtpRepository(Otp)

export default otpRepository
