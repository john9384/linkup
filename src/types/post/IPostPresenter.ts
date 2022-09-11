import { IPost } from './IPost'

export interface IPostPresenter {
	serialize(userDocument: IPost, selectors: Array<keyof IPost>): Partial<IPost>
}
