/* eslint-disable no-unused-vars */
import { Read } from './read'
import { Write } from './write'

export interface IBaseRepository<T> extends Read<T>, Write<T> {}
