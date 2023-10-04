/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Mentor from '../model/Mentor'
import { type Request, type Response, type NextFunction } from 'express'

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

    return res.status(200).json({
      msg: 'Mentor updated successfully',
      result: 'success',
      data: mentor
    })
  } catch (error) {
    next(error)
  }
}
