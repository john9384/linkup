import { CustomError } from '../../../library/helpers/error'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import { generateUsername } from '../../../library/utils/username-generator'
import { IUser } from '../types/model'
import { ICreateUser, IQueryUser, IUpdateUser } from '../types/dtos'
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

	createUser = async (data: ICreateUser): Promise<IUser> => {
		const user = await userRepository.fetchOneUser({ email: data.email })

		if (user) {
			throw new CustomError({
				message: 'User with email exits',
				status: BAD_REQUEST,
			})
		}
		const username = generateUsername(data.firstname, data.lastname)
		const newUser = await userRepository.createUser({
			...data,
			username,
		})

		return newUser
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
