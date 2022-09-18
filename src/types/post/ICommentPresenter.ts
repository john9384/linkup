import { IComment } from './IComment'

export interface ICommentPresenter {
	serialize(
		document: IComment,
		selectors: Array<keyof IComment>,
	): Partial<IComment>
}
