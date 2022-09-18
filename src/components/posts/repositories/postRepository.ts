import { IPost } from 'src/types/post/IPost'
import BaseRepository from '../../../db/repository/BaseRepository'
import { Post } from '../models'
import { IPostRepository } from '../../../types/post/IPostRepository'

class PostRepository extends BaseRepository<IPost> implements IPostRepository {}

export const postRepository = new PostRepository(Post)
