import express from 'express'
import { body } from 'express-validator'
import { createMentor } from '@controllers/mentor'

const router = express.Router()

// Validation middleware for the mentor creation request
const mentorValidationRules = [
  body('name').isString().trim().notEmpty(),
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

// Create a new mentor
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/mentors', mentorValidationRules, createMentor)

export default router
