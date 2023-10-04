/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Mentor from '../model/Mentor'
import { type Request, type Response, type NextFunction } from 'express'
import { producer } from '../configs/kafka-producer'
import { MENTOR_UPDATED } from '../events'
import logger from '../configs/logger'

export const getAllMentors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mentors = await Mentor.find({})
    return res.status(200).json({
      msg: 'Mentor fetched successfully',
      result: 'success',
      data: mentors
    })
  } catch (error) {
    next(error)
  }
}

export const verifyMentor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mentor = await Mentor.findById(req.params.id)
    if (mentor === null) {
      return res.status(404).json({
        msg: 'Invalid user id',
        result: 'error',
        data: null
      })
    }

    mentor.verified = true
    mentor.onborded = true
    await mentor.save()

    logger.info(`Mentor updated event ${JSON.stringify(mentor)}`)
    await producer.send({
      topic: MENTOR_UPDATED,
      messages: [
        { value: JSON.stringify({ email: mentor.email, verified: true, onborded: true }) }
      ]
    })
    return res.status(200).json({
      msg: 'Mentor updated successfully',
      result: 'success',
      data: mentor
    })
  } catch (error) {
    next(error)
  }
}
