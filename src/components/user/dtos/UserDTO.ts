import { IUser } from 'src/types/user'
import { ICreateUser, IUserDTO } from '../../../types/user/IUserDTO'
export class UserDTO implements IUserDTO {
	create(payload: ICreateUser): Partial<IUser> {
		throw new Error('Method not implemented.')
	}
}
