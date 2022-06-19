import { CustomError } from '../../../library/helpers/error'
import { BAD_REQUEST } from '../../../library/constants/http-status'
import { IUser } from '../types/model'
import { ICreateUser, IQueryUser, IUpdateUser } from '../types/dtos'
import userRepository from '../repositories'

export const createUser = async (data: ICreateUser): Promise<IUser> => {
	const user = await userRepository.fetchOneUser({ email: data.email })
	if (user) {
		throw new CustomError({
			message: 'User with email exits',
			status: BAD_REQUEST,
		})
	}

	const newUser = await userRepository.createUser(data)

	return newUser
}

export const updateUser = async (
	query: IQueryUser,
	data: IUpdateUser,
): Promise<IUser | null> => {
	const user = await userRepository.updateUser(query, data)

	return user
}

export const fetchUser = async (query: IQueryUser): Promise<IUser | null> => {
	const user = await userRepository.fetchOneUser(query)

	return user
}
