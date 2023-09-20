/* eslint-disable @typescript-eslint/explicit-function-return-type */
import kafka from './kafka-client'
import logger from './logger'

const consumer = kafka.consumer({ groupId: 'test-group' })

async function consumeData () {
  try {
    await consumer.subscribe({ topic: 'mentor-created', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          topic,
          offset: message.offset,
          value: message.value?.toString()
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
