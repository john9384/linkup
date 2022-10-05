import BaseRepository from '../../../db/repository/BaseRepository'
import { User } from '../models/User'
import { IUser } from '../../../types/user'
import { IUserRepository } from '../../../types/user/IUserRepository'

class UserRepository extends BaseRepository<IUser> implements IUserRepository {}
