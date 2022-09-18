import express, { Request, Response } from 'express'
import config from '../config'
import { logger } from '../library/helpers'
import { authRouter } from '../components/auth/routes'
import { userRouter } from '../components/user/routes'
import { postRouter, commentRouter } from '../components/posts/routes'

const router = express.Router()

const PREFIX = config.api.PREFIX

router.get('/', (req: Request, res: Response) => {
	logger.info('App started')
	res.status(200).send({
		app: config.app.NAME,
		msg: 'Application running',
	})
})

router.use(`/${PREFIX}/auth`, authRouter)
router.use(`/${PREFIX}/users`, userRouter)
router.use(`/${PREFIX}/posts`, postRouter)
router.use(`/${PREFIX}/comments`, commentRouter)

export default router
