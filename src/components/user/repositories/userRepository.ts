import BaseRepository from '../../../db/repository/BaseRepository'
import { User } from '../models/User'
import { IUser, ICreateUser, IUpdateUser, IReadUser } from '../../../types/user'

class UserRepository extends BaseRepository {
	fetchUsers = async (query?: IReadUser): Promise<IUser[] | null> => {
		const users = await this.fetch<IReadUser, IUser[]>(query)
		return users
	}
	fetchOneUser = async (query: IReadUser): Promise<IUser | null> => {
		const user = await this.fetchOne<IReadUser, IUser>(query)
		return user
	}

	createUser = async (data: ICreateUser): Promise<IUser> => {
		const newUser = await this.create<ICreateUser, IUser>(data)
		return newUser
	}

	updateUser = async (
		query: IReadUser,
		data: IUpdateUser,
	): Promise<IUser | null> => {
		const updatedUser = await this.update<IReadUser, IUpdateUser, IUser>(
			query,
			data,
		)

		return updatedUser
	}
}

export const userRepository = new UserRepository(User)
