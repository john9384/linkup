import { IBaseRepository } from '../db'
import { IUser } from './IUser'
import { IReadUser, ICreateUser, IUpdateUser, IDestroyUser } from './IUserDTO'

export interface IUserRepository extends IBaseRepository {
	fetchUsers(query?: IReadUser): Promise<IUser[]>
	createUser(query?: ICreateUser): Promise<Partial<IUser>>
	readUser(query: IReadUser): Promise<IUser | null>
	updateUser(query: IReadUser, data: IUpdateUser): Promise<IUser>
	destroyUser(query?: IDestroyUser): Promise<boolean>
}
