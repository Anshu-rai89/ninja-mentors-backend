/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { body } from 'express-validator'
import { createMentor, getVerifiedMentors } from '../controllers/mentor'

const router = express.Router()

// Validation middleware for the mentor creation request
const mentorValidationRules = [
  body('name').isString().trim().notEmpty(),
  body('password').isString().trim().notEmpty().isLength({ min: 5, max: 10 }),
  body('email').isEmail().normalizeEmail(),
  body('degree').isString().trim().notEmpty(),
  body('college').isString().trim().notEmpty(),
  body('course').isString().trim().notEmpty(),
  body('workExperience').isNumeric(),
  body('company').isString().trim().notEmpty(),
  body('designation').isString().trim().notEmpty(),
  body('bio').isString().trim().notEmpty(),
  body('linkedin').optional().isURL(),
  body('github').optional().isURL(),
  body('skills').isArray()
]

router.post('/mentor', mentorValidationRules, createMentor)
router.get('/mentor', getVerifiedMentors)

export default router
