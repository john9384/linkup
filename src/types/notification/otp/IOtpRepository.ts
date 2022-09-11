import { IOtp } from './IOtp'
import { ICreateOtp, IReadOtp } from './IOtpDTO'

export interface IOtpRepository {
	readOtp(query: IReadOtp): Promise<IOtp | null>
	createOtp(query: ICreateOtp): Promise<IOtp | null>
	updateOtp(query: IReadOtp): Promise<IOtp | null>
	destroyOtp(query: IReadOtp): Promise<boolean>
}
