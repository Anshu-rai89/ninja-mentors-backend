import logger from '../configs/logger'
import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Mentor, type IMentor } from '../models/Mentor'
import { producer } from '../configs/kafka-producer'
import { MENTOR_CREATED } from 'src/events'

// Controller function for creating a new mentor
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createMentor = async (req: Request, res: Response, next: NextFunction) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    // Create a new mentor instance based on the request body
    const newMentor: IMentor = new Mentor(req.body)
    const mentor = await newMentor.save()
    const eventMsg = {
      name: mentor.name,
      email: mentor.email,
      avatar: mentor.avatar,
      degree: mentor.degree,
      college: mentor.college,
      company: mentor.company,
      course: mentor.course,
      workExperience: mentor.workExperience,
      designation: mentor.designation,
      bio: mentor.bio,
      github: mentor.github,
      linkedin: mentor.linkedin,
      verified: mentor.verified,
      onborded: mentor.onborded
    }
    await producer.send({
      topic: MENTOR_CREATED,
      messages: [
        { value: JSON.stringify(eventMsg) }
      ]
    })
    return res.status(201).json(eventMsg)
  } catch (error: any) {
    next(error)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getVerifiedMentors = async (req: Request, res: Response) => {
  try {
    // Query the database for verified mentors
    const verifiedMentors = await Mentor.find({ verified: true })

    res.status(200).json(verifiedMentors)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
