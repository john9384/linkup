import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import Logger from '../library/helpers/loggers'

if (process.env.ENVIRONMENT === 'development' && !fs.existsSync('.env')) {
	Logger.error('.env file not found')
}

dotenv.config({
	path: path.join(__dirname, '../../.env'),
})

const config = {
	API_PREFIX: process.env.API_PREFIX,
	APP_NAME: process.env.APP_NAME,
	APP_PORT: process.env.APP_PORT,
	ENVIRONMENT: process.env.NODE_ENV,
	CRYPTO_ENCRYPTION_METHOD: process.env.CRYPTO_ENCRYPTION_METHOD,
	CRYPTO_SECRET_IV: process.env.CRYPTO_SECRET_IV,
	CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
	MONGO_URI: process.env.MONGO_URI,
	DB_TYPE: process.env.DB_TYPE,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_TOKEN_TYPE: process.env.JWT_TOKEN_TYPE,
}

export default config
