import { Read, Write } from '../../db/interface'
import { IUser } from './IUser'

export interface IUserRepository extends Read<IUser>, Write<IUser> {}
