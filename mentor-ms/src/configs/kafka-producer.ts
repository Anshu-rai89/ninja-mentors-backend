/* eslint-disable @typescript-eslint/explicit-function-return-type */
import kafka from './kafka-client'
import logger from './logger'

const producer = kafka.producer()

const setupProducer = async () => {
  try {
    await producer.connect()
    logger.info('Connected to kafka producer')
  } catch (error: any) {
    logger.error('Error connecting to kafka producer', error)
  }
}

export {
  setupProducer,
  producer
}
