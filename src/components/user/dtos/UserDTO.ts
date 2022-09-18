import { IUser } from 'src/types/user'
import {
	ICreateUser,
	IReadUser,
	IUpdateUser,
	IUserDTO,
} from '../../../types/user/IUserDTO'
export class UserDTO implements IUserDTO {
	create(payload: ICreateUser): Partial<IUser> {
		const { firstname, lastname, email, password } = payload
		const username = this._generateUsername(firstname, lastname)

		return {
			firstname,
			lastname,
			email,
			password,
			username,
		}
	}
	read(payload?: IReadUser): Partial<IUser> {
		if (!payload) return {}

		const { id, email, username } = payload
		if (id) return { id }
		if (email) return { email }
		if (username) return { username }

		return {}
	}
	update(payload: IUpdateUser): Partial<IUser> {
		return {
			...payload,
		}
	}

	private _generateUsername(firstname: string, lastname: string): string {
		let timestamp = new Date().getTime()
		let code = `${timestamp}`.substring(9, 13)
		const first = firstname.substring(0, 4)
		const last = lastname.substring(0, 4)
		return `${first.toLowerCase()}${last.toLowerCase()}${code}`
	}
}

export const userDTO = new UserDTO()
