import express from 'express'
import { authRouter } from '../components/auth/routes'
import userRouter from '../components/user/routes/userRoutes'
import profileRouter from '../components/user/routes/profileRoutes'
import postRouter from '../components/posts/routes/postRoutes'
import config from '../config'

const router = express.Router()

const PREFIX = config.api.PREFIX

router.use(`/${PREFIX}/auth`, authRouter)
router.use(`/${PREFIX}/users`, userRouter)
router.use(`/${PREFIX}/profiles`, profileRouter)
router.use(`/${PREFIX}/posts`, postRouter)

export default router
