import { IPost } from './IPost'

export interface IPostPresenter {
	serialize(
		userDocument: IPost | null,
		selectors: Array<keyof IPost>,
	): Partial<IPost>
}
