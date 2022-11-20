import { IUser, ICreateUser, IReadUser, IUpdateUser } from '../../../types/user'
import { userRepository } from '../repositories'
import { BadRequestError } from '../../../library/helpers/error'
import { userPresenter } from '../presenters/UserPresenter'
import { IUserService } from '../../../types/user/IUserService'
import { userDTO } from '../dtos/UserDTO'

class UserService implements IUserService {
	public async fetch(
		query?: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Array<Partial<IUser>> | []> {
		const dto = userDTO.read(query)
		const users: IUser[] = await userRepository.fetch(dto)

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
		const dto = userDTO.create(formData)
		const user = await userRepository.read({ email: dto.email })

		if (user) {
			throw new BadRequestError('User with email exits')
		}

		const newUser = await userRepository.create(dto as IUser)

		return userPresenter.serialize(newUser, ['email'])
	}

	public async read(
		query: IReadUser,
		fields?: Array<keyof IUser>,
	): Promise<Partial<IUser> | null> {
		const dto = userDTO.read(query)
		const user = await userRepository.read(dto)

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
		payload: IUpdateUser,
	): Promise<Partial<IUser> | null> {
		const readDto = userDTO.read(query)
		const updateDto = userDTO.update(payload)
		const user = await userRepository.update(readDto, updateDto)
		return userPresenter.serialize(user, [])
	}

	public async delete(query: IReadUser): Promise<boolean> {
		const readDto = userDTO.read(query)
		return await userRepository.delete(readDto)
	}
}

export const userService = new UserService()
