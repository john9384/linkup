import _ from 'lodash'
import { IUser, IUserPresenter } from '../../../types/user'

class UserPresenter implements IUserPresenter {
	public serialize(
		userDocument: IUser | null,
		selectors: Array<keyof IUser>,
	): Partial<IUser> {
		if (!userDocument) return {}

		// This protects password from being returned when all user data is required
		const password = selectors.length > 0 ? userDocument.password : ''

		const userEntity = {
			id: userDocument.id,
			email: userDocument.email,
			lastname: userDocument.lastname,
			firstname: userDocument.firstname,
			fullname: `${userDocument.firstname} ${userDocument.lastname}`,
			phone: userDocument.phone,
			password,
			username: userDocument.username,
			avatar: userDocument.avatar,
			bgImgUrl: userDocument.bgImgUrl,
			gender: userDocument.gender,
			religion: userDocument.religion,
			location: userDocument.location,
			emailVerified: userDocument.emailVerified,
			phoneVerified: userDocument.phoneVerified,
		}

		return selectors.length > 0 ? _.pick(userEntity, selectors) : userEntity
	}
}

export const userPresenter = new UserPresenter()
