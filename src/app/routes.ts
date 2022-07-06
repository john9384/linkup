import express from 'express'
import authRouter from '../components/auth/authRoutes'
import userRouter from '../components/user/routes'
import config from '../config'

const router = express.Router()

const { API_PREFIX } = config

router.use(`/${API_PREFIX}/auth`, authRouter)
router.use(`/${API_PREFIX}/user`, userRouter)

export default router
