/* eslint-disable @typescript-eslint/explicit-function-return-type */
import kafka from './kafka-client'
import logger from './logger'
import Mentor, { type IMentor } from '../model/Mentor'
import { MENTOR_CREATED } from '../events'

const consumer = kafka.consumer({ groupId: 'onboarding' })

async function consumeData () {
  try {
    await consumer.subscribe({ topic: MENTOR_CREATED, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value ?? '{}'
        const mentor = JSON.parse(value.toString())
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
          github,
          company,
          college,
          degree
        } = mentor as unknown as IMentor

        logger.info(`Mentor created recived ${JSON.stringify(mentor)}`)
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
          github,
          company,
          college,
          degree
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
