import mongoose from 'mongoose'
import config from './config'
import Logger from '../library/helpers/loggers'
import { IError } from '../library/helpers/error'

const ConnectDatabase = () => {
	mongoose
		.connect(String(config.MONGO_URI), {})
		.then(() => {
			Logger.info('------- Database Connected -------')
		})
		.catch((error: IError) => {
			Logger.error('------ Database Connection Failed -------')
			Logger.error(error)
		})
}

export default ConnectDatabase
