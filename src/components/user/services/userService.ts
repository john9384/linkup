import _ from 'lodash'
import { IUser } from '../types/model'
import { ICreateUser, IQueryUser, IUpdateUser } from '../types/dtos'
import userRepository from '../repositories/userRepository'
import { bcryptEncode } from '../../../library/helpers/bcrypt'
import { CustomError } from '../../../library/helpers/error'
import { generateUsername } from '../../../library/utils/username-generator'
import { BAD_REQUEST } from '../../../library/constants/http-status'

class UserService {
	fetchUsers = async (
		query?: IQueryUser,
		fields?: string[],
	): Promise<(Partial<IUser> | null)[]> => {
		const users = await userRepository.fetchUsers(query)

		if (!users) return []

		if (fields) {
			return users.map(user => this.serialize(user, fields))
		}

		return users.map(user =>
			this.serialize(user, [
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
		query: IQueryUser,
		fields?: string[],
	): Promise<Partial<IUser | null>> => {
		const user = await userRepository.fetchOneUser(query)

		if (!user) return null

		if (fields) {
			return this.serialize(user, fields)
		}

		return this.serialize(user, [
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
		const { firstname, lastname, email } = formData
		const user = await this.fetchOneUser({ email }, ['email'])

		if (user) {
			throw new CustomError({
				message: 'User with email exits',
				status: BAD_REQUEST,
			})
		}
		const password = await bcryptEncode(formData.password)
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
		query: IQueryUser,
		data: IUpdateUser,
	): Promise<IUser | null> => {
		const user = await userRepository.updateUser(query, data)
		// Todo
		// Hash neccessary field befor update
		return user
	}

	private serialize(user: IUser, fields: string[]): Partial<IUser> | null {
		if (!user) return null

		const userData = {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			password: user.password,
			username: user.username,
			phone: user.phone,
			avatar: user.avatar,
			bgImgUrl: user.bgImgUrl,
			gender: user.gender,
			religion: user.religion,
			location: user.location,
			emailVerified: user.emailVerified,
			phoneVerified: user.phoneVerified,
		}

		return _.pick(userData, fields)
	}
}

export default new UserService()
