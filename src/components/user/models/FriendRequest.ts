import { Schema, model } from 'mongoose'
import { IFriendRequest } from '../../../types/user/friendRequest/IFriendRequest';



export const User = model<IUser>('user', userSchema)