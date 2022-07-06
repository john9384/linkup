import http from 'http'
import cluster from 'cluster'
import os from 'os'
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose'
import config from '../config'
import Logger from '../library/helpers/loggers'
import app from '../app'
import { IError } from '../library/helpers/error'

const PORT = config.APP_PORT || 4000

if (cluster.isPrimary) {
	const cpuCoreCount = os.cpus().length

	for (let index = 0; index < cpuCoreCount; index++) {
		cluster.fork()
	}
	cluster.on('exit', worker => {
		Logger.warn(`Worker ${worker.id} died'`)
		Logger.warn('Starting a new one ...')
		cluster.fork()
	})
} else {
	mongoose
		.connect(String(config.MONGO_URI), {})
		.then(() => {
			Logger.info('------- Database Connected -------')
		})
		.catch((error: IError) => {
			Logger.error('------ Database Connection Failed -------')
			Logger.error(error)
		})

	new http.Server(app).listen(PORT, () => {
		Logger.info(`
  -------------------------------------------
    ${config.APP_NAME?.toUpperCase()} Server listening on port ${PORT}
  -------------------------------------------
  `)
	})
}
