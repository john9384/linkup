import http from 'http'
import cluster from 'cluster'
import os from 'os'
import config from '../config'
import Logger from '../library/helpers/loggers'
import app from '../app'
import ConnectDatabase from '../db/connectDB'

const PORT = process.env.APP_PORT || 4000

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
	ConnectDatabase()

	new http.Server(app).listen(PORT, () => {
		Logger.info(`
  -------------------------------------------
    ${config.APP_NAME?.toUpperCase()} Server listening on port ${PORT}
  -------------------------------------------
  `)
	})
}
