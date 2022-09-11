import _ from 'lodash'
import { IUser, ICreateUser, IReadUser, IUpdateUser } from '../../../types/user'
import { userRepository } from '../repositories'
import { BadRequestError } from '../../../library/helpers/error'
import { userPresenter } from '../presenters/UserPresenter'
import { IUserService } from '../../../types/user/IUserService'

class UserService implements IUserService {
	public async fetch(
		query?: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Array<Partial<IUser>> | []> {
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
				'fullname',
				'email',
				'username',
				'phone',
				'emailVerified',
				'phoneVerified',
			]),
		)
	}

	public async create(formData: ICreateUser): Promise<Partial<IUser>> {
		const { firstname, lastname, email, password } = formData
		const user = await this.read({ email }, ['email'])

		if (user) {
			throw new BadRequestError('User with email exits')
		}

		const username = this._generateUsername(firstname, lastname)
		const newUser = await userRepository.createUser({
			firstname,
			lastname,
			email,
			password,
			username,
		})
		return userPresenter.serialize(newUser, ['email'])
	}

	public async read(
		query: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Partial<IUser> | null> {
		const user = await userRepository.readUser(query)

		if (!user) return null

		if (fields) {
			return userPresenter.serialize(user, fields)
		}

		return userPresenter.serialize(user, [
			'id',
			'firstname',
			'lastname',
			'fullname',
			'email',
			'username',
			'phone',
			'emailVerified',
			'phoneVerified',
		])
	}

	public async update(
		query: IReadUser,
		data: IUpdateUser,
	): Promise<Partial<IUser> | null> {
		const user = await userRepository.updateUser(query, data)
		return userPresenter.serialize(user, [])
	}

	public async destroy(query: IReadUser): Promise<boolean> {
		return await userRepository.destroy(query)
	}

	private _generateUsername(firstname: string, lastname: string): string {
		let timestamp = new Date().getTime()
		let code = `${timestamp}`.substring(9, 13)
		const first = firstname.substring(0, 4)
		const last = lastname.substring(0, 4)
		return `${first.toLowerCase()}${last.toLowerCase()}${code}`
	}
}

export const userService = new UserService()
