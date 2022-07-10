import { generateOTP } from '../../library/utils/otp-generator'
import BaseRepository from '../../db/repository/BaseRepository'
import { IOtp } from './types/modelTypes'
import { Otp } from './models/Otp'
import { ICreateOtp, IQueryOtp } from './types/formTypes'

class OtpRepository extends BaseRepository {
	fetchOneOtp = async (query: IQueryOtp): Promise<IOtp | null> => {
		const otp = await this.fetchOne<IQueryOtp, IOtp>(query)

		return otp
	}

	createOtp = async ({
		userId,
		transporter,
		transporterType,
		instance,
	}: ICreateOtp) => {
		let { token, expiryTime } = generateOTP()
		let newOtp = await this.create<ICreateOtp, IOtp>({
			userId,
			transporter,
			transporterType,
			instance,
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
