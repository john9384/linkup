import { Read, Write } from '../../db/interface'
import { IPost } from './IPost'

export interface IPostRepository extends Read<IPost>, Write<IPost> {}
