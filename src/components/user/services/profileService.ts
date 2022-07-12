import _ from 'lodash'
import { IUser } from '../types/model'
import { IQueryUser, IUpdateUser } from '../types/dtos'
import userRepository from '../repositories/userRepository'

class ProfileService {
	fetchProfiles = async (
		query?: IQueryUser,
		fields?: string[],
	): Promise<(Partial<IUser> | null)[]> => {
		const users: IUser[] | null = await userRepository.fetchUsers(query)

		if (!users) return []

		if (fields) {
			return users.map(user => this.serialize(user, fields))
		}

		const serializedUsers = users.map(user =>
			this.serialize(user, [
				'id',
				'firstname',
				'lastname',
				'fullname',
				'email',
				'username',
				'phone',
				'avatar',
				'bgImgUrl',
				'gender',
				'religion',
				'location',
				'emailVerified',
				'phoneVerified',
			]),
		)

		return serializedUsers
	}

	fetchOneProfile = async (
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
			'fullname',
			'email',
			'username',
			'phone',
			'avatar',
			'bgImgUrl',
			'gender',
			'religion',
			'location',
			'emailVerified',
			'phoneVerified',
		])
	}

	updateProfile = async (
		query: IQueryUser,
		data: IUpdateUser,
	): Promise<IUser | null> => {
		const user = await userRepository.updateUser(query, data)
		return user
	}

	private serialize(user: IUser, fields: string[]): Partial<IUser> | null {
		if (!user) return null

		const userData = {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			fullname: `${user.firstname} ${user.lastname}`,
			email: user.email,
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

export default new ProfileService()
