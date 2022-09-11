import BaseRepository from '../../../db/repository/BaseRepository'
import { User } from '../models/User'
import {
	IUser,
	ICreateUser,
	IUpdateUser,
	IReadUser,
	IDestroyUser,
} from '../../../types/user'
import { IUserRepository } from '../../../types/user/IUserRepository'

class UserRepository extends BaseRepository implements IUserRepository {
	fetchUsers = async (query?: IReadUser): Promise<IUser[]> => {
		const users = await this.fetch<IReadUser, IUser[]>(query)
		return users
	}
	readUser = async (query: IReadUser): Promise<IUser | null> => {
		const user = await this.read<IReadUser, IUser>(query)
		return user
	}

	createUser = async (data: ICreateUser): Promise<IUser> => {
		const newUser = await this.create<ICreateUser, IUser>(data)
		return newUser
	}

	updateUser = async (query: IReadUser, data: IUpdateUser): Promise<IUser> => {
		const updatedUser = await this.update<IReadUser, IUpdateUser, IUser>(
			query,
			data,
		)

		return updatedUser
	}
	public async destroyUser(query: IDestroyUser): Promise<boolean> {
		await this.destroy<IDestroyUser>(query)
		return true
	}
}

export const userRepository = new UserRepository(User)
