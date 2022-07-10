import { IUser } from '../types/model'
import { IQueryUser, IUpdateUser } from '../types/dtos'
import userRepository from '../repositories'

class UserService {
	fetchUsers = async (query?: IQueryUser): Promise<IUser[] | null> => {
		const users = await userRepository.fetchUsers(query)
		return users
	}

	fetchOneUser = async (query: IQueryUser): Promise<IUser | null> => {
		const user = await userRepository.fetchOneUser(query)

		return user
	}

	updateUser = async (
		query: IQueryUser,
		data: IUpdateUser,
	): Promise<IUser | null> => {
		const user = await userRepository.updateUser(query, data)
		// Todo
		// Hash neccessary field befor update
		return user
	}
}

export default new UserService()
