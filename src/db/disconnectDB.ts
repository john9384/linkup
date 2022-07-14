import mongoose from 'mongoose'
import Logger from '../library/helpers/loggers'

const disconnectDB = async () => {
	await mongoose.connection.close()
	Logger.info('------ DB disconnected -----')
}

export default disconnectDB
