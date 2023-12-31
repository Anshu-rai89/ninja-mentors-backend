/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { consumeData } from './configs/kafka-consumer'
import app from './app'
import intiDb from './configs/db'
import { setupProducer } from './configs/kafka-producer'
import logger from './configs/logger'

const port = process.env.PORT ?? 3000

async function startServer () {
  await intiDb()
  await setupProducer()
  await consumeData()
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
  })
}

void startServer()
