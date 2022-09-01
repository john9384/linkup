import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import i18next from 'i18next'
import i18nextBackend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import morganMiddleware from '../library/middlewares/morgan'
import Logger from '../library/helpers/loggers'
import { IError } from '../library/helpers/error'
import routes from './routes'
import { i18tn } from '../library/helpers/i18tn'

const app = express()

app.use(cors())
app.use(express.raw())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, 'src/app/public')))
app.use(morganMiddleware)

app.get('/', (req, res) => {
	res.send({
		app: process.env.APP_NAME,
		message: i18tn.t('app.running', { appName: process.env.APP_NAME }),
		status: 200,
	})
})
app.use('/', routes)

app.get('*', (_, res) => res.send('Invalid route'))

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
	Logger.error(error.stack)

	return res.status(error.status || 500).send({
		success: false,
		message: error.message || 'Failed',
		data: error.data || {},
		error,
	})
})

export default app
