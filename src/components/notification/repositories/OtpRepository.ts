import BaseRepository from '../../../db/repository/BaseRepository'
import { generateOTP } from '../../../library/utils/otp-generator'
import { IOtp, ICreateOtp } from '../../../types/notification'
import { IReadOtp } from '../../../types/notification/otp/IOtpDTO'
import { IOtpRepository } from '../../../types/notification/otp/IOtpRepository'
import { Otp } from '../models/Otp'

class OtpRepository extends BaseRepository implements IOtpRepository {
	readOtp = async (query: IReadOtp): Promise<IOtp | null> => {
		const otp = await this.read<IReadOtp, IOtp>(query)

		return otp
	}

	createOtp = async ({
		userId,
		transporter,
		transporterType,
		instance,
	}: ICreateOtp): Promise<IOtp | null> => {
		const existingOtp = await this.readOtp({
			userId,
			transporter,
			transporterType,
			instance,
		})

		if (existingOtp) {
			const otp = await this.updateOtp({
				userId,
				transporter,
				transporterType,
				instance,
			})
			return otp
		}

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

	updateOtp = async (query: IReadOtp): Promise<IOtp | null> => {
		let otp = await this.readOtp(query)
		if (otp) {
			let { token, expiryTime } = generateOTP()
			let otpData = { token, tokenExpires: expiryTime }

			otp = await this.update<IReadOtp, typeof otpData, IOtp>(query, otpData)
		}

		return otp
	}

	destroyOtp = async (query: IReadOtp) => {
		this.destroy(query)
		return true
	}
}
export const otpRepository = new OtpRepository(Otp)
