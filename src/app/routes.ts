import express from 'express'
import authRouter from '../components/auth/authRoutes'
import userRouter from '../components/user/routes/userRoutes'
import profileRouter from '../components/user/routes/profileRoutes'
import config from '../config'

const router = express.Router()

const { API_PREFIX } = config

router.use(`/${API_PREFIX}/auth`, authRouter)
router.use(`/${API_PREFIX}/users`, userRouter)
router.use(`/${API_PREFIX}/profiles`, profileRouter)

export default router
