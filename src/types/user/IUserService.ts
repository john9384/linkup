import { IUser } from './IUser'
import { ICreateUser, IDestroyUser, IReadUser, IUpdateUser } from './IUserDTO'

export interface IUserService {
	fetch(
		query?: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Array<Partial<IUser>> | []>
	read(
		query: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Partial<IUser> | null>
	create(payload: ICreateUser): Promise<Partial<IUser>>
	update(query: IReadUser, payload: IUpdateUser): Promise<Partial<IUser> | null>
	destroy(query: IDestroyUser): Promise<boolean>
}
