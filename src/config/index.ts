import dotenv from 'dotenv'

const envFound = dotenv.config({ path: '.env' })

if (!envFound) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

const config = {
	api: {
		BASE: process.env.API_BASE,
		PREFIX: process.env.API_PREFIX,
	},
	app: {
		NAME: process.env.APP_NAME,
		PORT: Number(process.env.APP_PORT),
		ENV: process.env.NODE_ENV,
		CRYPTO_ENCRYPTION_METHOD: process.env.CRYPTO_ENCRYPTION_METHOD,
		CRYPTO_SECRET_IV: process.env.CRYPTO_SECRET_IV,
		CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
	},
	aws: {
		accessId: process.env.AWS_ACCESS_ID,
		accessSecret: process.env.AWS_ACCESS_SECRET,
		region: process.env.AWS_REGION,
		signature: process.env.AWS_SIGNATURE_V,
		iconBucketUrl: process.env.AWS_ICON_BUCKET_URL,
	},
	db: {
		URI: process.env.MONGODB_URI,
	},
	frontend: {
		base: process.env.FRONTEND_BASE,
		oauthRedirect: process.env.FRONTEND_OAUTH_REDIRECT,
	},
	jwt: {
		SECRET: process.env.JWT_SECRET,
		TOKEN_TYPE: process.env.JWT_TOKEN_TYPE,
	},
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
		directory: process.env.LOG_DIRECTORY,
	},
	rabbitMQ: {
		host: process.env.RABBITMQ_HOST || 'amqp://localhost',
	},
	sendgrid: {
		apiKey: String(process.env.SENDGRID_API_KEY),
	},
}

export default config
