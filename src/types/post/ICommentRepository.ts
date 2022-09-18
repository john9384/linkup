import { Read, Write } from '../../db/interface'
import { IComment } from './IComment'

export interface ICommentRepository extends Read<IComment>, Write<IComment> {}
