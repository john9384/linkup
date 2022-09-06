import _ from 'lodash'
import { IUser, ICreateUser, IReadUser, IUpdateUser } from '../../../types/user'
import { userRepository } from '../repositories'
import { generateUsername } from '../../../library/utils/username-generator'
import { BadRequestError } from '../../../library/helpers/error'
import { userPresenter } from '../presenters/UserPresenter'

class UserService {
	fetchUsers = async (
		query?: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<(Partial<IUser> | null)[]> => {
		const users = await userRepository.fetchUsers(query)

		if (!users) return []

		if (fields) {
			return users.map(user => userPresenter.serialize(user, fields))
		}

		return users.map(user =>
			userPresenter.serialize(user, [
				'id',
				'firstname',
				'lastname',
				'email',
				'username',
				'phone',
				'emailVerified',
				'phoneVerified',
			]),
		)
	}

	fetchOneUser = async (
		query: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Partial<IUser | null>> => {
		const user = await userRepository.fetchOneUser(query)

		if (!user) return null

		if (fields) {
			return userPresenter.serialize(user, fields)
		}

		return userPresenter.serialize(user, [
			'id',
			'firstname',
			'lastname',
			'email',
			'username',
			'phone',
			'emailVerified',
			'phoneVerified',
		])
	}

	createUser = async (formData: ICreateUser): Promise<IUser> => {
		const { firstname, lastname, email, password } = formData
		const user = await this.fetchOneUser({ email }, ['email'])

		if (user) {
			throw new BadRequestError('User with email exits')
		}

		const username = generateUsername(firstname, lastname)
		const newUser = await userRepository.createUser({
			firstname,
			lastname,
			email,
			password,
			username,
		})
		return newUser
	}

	updateUser = async (
		query: IReadUser,
		data: IUpdateUser,
	): Promise<IUser | null> => {
		const user = await userRepository.updateUser(query, data)
		return user
	}

	deleteUser = async (query: IReadUser): Promise<boolean> => {
		return await userRepository.destroy(query)
	}
}

export const userService = new UserService()
