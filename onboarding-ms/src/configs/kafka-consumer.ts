/* eslint-disable @typescript-eslint/explicit-function-return-type */
import kafka from './kafka-client'
import logger from './logger'
import Mentor, { type IMentor } from '../model/Mentor'
import { MENTOR_CREATED } from 'src/events'

const consumer = kafka.consumer({ groupId: 'onboarding' })

async function consumeData () {
  try {
    await consumer.subscribe({ topic: MENTOR_CREATED, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ message }) => {
        const {
          name,
          avatar,
          email,
          course,
          workExperience,
          designation,
          bio,
          onborded,
          verified,
          skills,
          linkedin,
          github
        } = message as unknown as IMentor
        await Mentor.create({
          name,
          avatar,
          email,
          course,
          workExperience,
          designation,
          bio,
          onborded,
          verified,
          skills,
          linkedin,
          github
        })
      }
    })
  } catch (error) {
    logger.error('Error consuming data', error)
  }
}

export {
  consumeData
}
