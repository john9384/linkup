import * as HTTP_STATUS from './constants/http-status'
import * as BCRYPT from './helpers/bcrypt'
import * as ERROR_HANDLERS from './helpers/error'
import * as JWT from './helpers/jwt'
import LOGGER from './helpers/loggers'
import * as MAILER from './helpers/mail'
import AUTH_MIDDLEWARE from './middlewares/authentication'
import MORGAN_MIDDLEWARE from './middlewares/morgan'

export const constants = {
	httpStatus: HTTP_STATUS,
}

export const helpers = {
	bcrypt: BCRYPT,
	error: ERROR_HANDLERS,
	jwt: JWT,
	logger: LOGGER,
	mail: MAILER,
}

export const middlewares = {
	isAuthenticated: AUTH_MIDDLEWARE,
	morgan: MORGAN_MIDDLEWARE,
}
export const utils = {}
