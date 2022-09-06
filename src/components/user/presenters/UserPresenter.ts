import _ from 'lodash'
import { IUserPresenter } from '../../../types/user'
import { IUser } from '../../../types/user'

class UserPresenter implements IUserPresenter {
	public serialize(
		userDocument: IUser,
		selectors: Array<keyof IUser> = ['email'],
	): Partial<IUser> {
		const userEntity = {
			email: userDocument.email,
			lastname: userDocument.lastname,
			firstname: userDocument.firstname,
			phone: userDocument.phone,
			password: userDocument.password,
			username: userDocument.username,
			avatar: userDocument.avatar,
			bgImgUrl: userDocument.bgImgUrl,
			gender: userDocument.gender,
			religion: userDocument.religion,
			location: userDocument.location,
			emailVerified: userDocument.emailVerified,
			phoneVerified: userDocument.phoneVerified,
			// friends: userDocument.friends,
		}

		return _.pick(userEntity, selectors)
	}
}

export const userPresenter = new UserPresenter()
