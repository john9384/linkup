import BaseRepository from '../../../db/repository/BaseRepository'
import { User } from '../models/User'
import { ICreateUser, IUpdateUser, IQueryUser } from '../types/dtos'
import { IUser } from '../types/model'

class UserRepository extends BaseRepository {
	fetchUsers = async (query?: IQueryUser): Promise<IUser[] | null> => {
		const users = await this.fetch<IQueryUser, IUser[]>(query)
		return users
	}
	fetchOneUser = async (query: IQueryUser): Promise<IUser | null> => {
		const user = await this.fetchOne<IQueryUser, IUser>(query)
		return user
	}

	createUser = async (data: ICreateUser): Promise<IUser> => {
		const newUser = await this.create<ICreateUser, IUser>(data)
		return newUser
	}

	updateUser = async (
		query: IQueryUser,
		data: IUpdateUser,
	): Promise<IUser | null> => {
		const updatedUser = await this.update<IQueryUser, IUpdateUser, IUser>(
			query,
			data,
		)

		return updatedUser
	}
}

const userRepository = new UserRepository(User)

export default userRepository
