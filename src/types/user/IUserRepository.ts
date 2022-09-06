import { IUser } from './IUser'
import { IReadUser, ICreateUser, IUpdateUser, IDestroyUser } from './IUserDTO'

export interface IUserRepository {
	create(query?: ICreateUser): Promise<Partial<IUser>>
	read(query?: IReadUser): Promise<Array<Partial<IUser>> | null>
	update(query?: IUpdateUser): Promise<Partial<IUser>>
	destroy(query?: IDestroyUser): Promise<boolean>
}
