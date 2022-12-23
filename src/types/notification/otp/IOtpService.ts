import { IOtp } from './IOtp'
import { ICreateOtp } from './IOtpDTO'

export interface IOtpService {
	request(payload: ICreateOtp): Promise<Record<string, string>>
	validate(token: string): Promise<IOtp>
}
