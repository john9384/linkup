import { Read, Write } from '../../../db/interface'
import { IOtp } from './IOtp'

export interface IOtpRepository extends Read<IOtp>, Write<IOtp> {}
