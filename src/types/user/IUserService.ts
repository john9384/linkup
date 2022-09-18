import { IUser } from './IUser'
import { ICreateUser, IDeleteUser, IReadUser, IUpdateUser } from './IUserDTO'

export interface IUserService {
	fetch(
		query?: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Array<Partial<IUser>> | []>
	create(payload: ICreateUser): Promise<Partial<IUser>>
	read(
		query: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Partial<IUser> | null>
	update(query: IReadUser, payload: IUpdateUser): Promise<Partial<IUser> | null>
	delete(query: IDeleteUser): Promise<boolean>
}
