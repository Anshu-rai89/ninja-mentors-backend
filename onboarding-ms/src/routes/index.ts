import express from 'express'
import mentorRoutes from './mentor'
const router = express.Router()

router.use('/mentor', mentorRoutes)

export default router
