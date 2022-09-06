import { IUser } from './IUser'

export interface IUserPresenter {
	serialize(userDocument: IUser, selectors: Array<keyof IUser>): Partial<IUser>
}
