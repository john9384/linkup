import { IComment } from '../../../types/post/IComment'
import BaseRepository from '../../../db/repository/BaseRepository'
import { Comment } from '../models'
import { ICommentRepository } from '../../../types/post/ICommentRepository'

class CommentRepository
	extends BaseRepository<IComment>
	implements ICommentRepository {}

export const commentRepository = new CommentRepository(Comment)
