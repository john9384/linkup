import { IUser } from './IUser'

export interface IUserPresenter {
	serialize(
		userDocument: IUser | null,
		selectors: Array<keyof IUser>,
	): Partial<IUser>
}
