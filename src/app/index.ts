import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import path from 'path'
import {
	logger,
	NotFoundError,
	ApiError,
	InternalError,
} from '../library/helpers'
import express, { Application, Request, Response, NextFunction } from 'express'

export default (): Application => {
	process.on('uncaughtException', e => {
		logger.error(e)
	})

	const app = express()

	app.use(cors())
	app.use(methodOverride())
	app.use(morgan('dev'))
	app.use(express.json())
	app.use(express.json({ limit: '2mb' }))
	app.use(
		express.urlencoded({
			limit: '2mb',
			extended: true,
		}),
	)
	app.use('/', express.static(path.join(__dirname, 'src/app/public')))
	app.set('view engine', 'html')
	app.use(cookieParser())
	app.use(helmet())
	app.set('trust proxy', 1)
	app.use('/', routes)

	// catch 404 and forward to error handler
	app.use((_req, _res, next) => next(new NotFoundError()))

	// Middleware Error Handler
	app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (err instanceof ApiError) {
			logger.error(err.stack)
			return ApiError.handle(err, res)
		} else {
			if (process.env.NODE_ENV === 'development') {
				logger.error(err.stack)
				return res.status(500).send(err.message)
			}
			return ApiError.handle(new InternalError(), res)
		}
	})

	return app
}
