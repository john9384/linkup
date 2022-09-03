import mongoose from 'mongoose'
import config from './config'
import Logger from '../library/helpers/logger'

const ConnectDatabase = async () => {
	mongoose
		.connect(String(config.MONGO_URI), {})
		.then(() => {
			Logger.info('------- Database Connected -------')
		})
		.catch((error: unknown) => {
			Logger.error('------ Database Connection Failed -------')
			Logger.error(error)
		})
}

export default ConnectDatabase
