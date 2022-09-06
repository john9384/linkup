import { IUser } from './IUser'
import { ICreateUser, IDestroyUser, IReadUser, IUpdateUser } from './IUserDTO'

export interface IUserService {
	create(payload: ICreateUser): Promise<Partial<IUser>>
	update(query: IReadUser, payload: IUpdateUser): Promise<Partial<IUser>>
	fetch(query?: IReadUser): Promise<Array<Partial<IUser>>>
	fetchOne(query: IReadUser): Promise<Partial<IUser>>
	destroy(query: IDestroyUser): Promise<boolean>
}
