/* eslint-disable @typescript-eslint/explicit-function-return-type */
import kafka from './kafka-client'
import logger from './logger'
import { Mentor, type IMentor } from '../models/Mentor'
import { MENTOR_UPDATED } from '../events'

const consumer = kafka.consumer({ groupId: 'mentor' })

async function consumeData () {
  try {
    await consumer.subscribe({ topic: MENTOR_UPDATED })
    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value ?? '{}'
        const mentorObj = JSON.parse(value.toString())
        logger.info(`Mentor updated recived ${JSON.stringify(mentorObj)}`)
        const { email } = mentorObj as unknown as IMentor
        const mentor = await Mentor.findOne({ email })
        if (mentor === null) {
          logger.error('Trying to update a mentor which do not exist', email)
        } else {
          await Mentor.findOneAndUpdate({ email }, { ...mentorObj })
        }
      }
    })
  } catch (error) {
    logger.error('Error consuming data', error)
  }
}

export {
  consumeData
}
