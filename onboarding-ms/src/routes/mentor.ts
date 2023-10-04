/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllMentors, verifyMentor } from '../controllers/mentorController'
const router = express.Router()

router.get('/', getAllMentors)
router.put('/:id', verifyMentor)

export default router
