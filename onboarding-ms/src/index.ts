/* eslint-disable @typescript-eslint/explicit-function-return-type */
import app from './app'
import logger from './configs/logger'
import { consumeData } from './configs/kafka-consumer'
import { setupProducer } from './configs/kafka-producer'
import initDb from './configs/db'

const port = process.env.PORT ?? 3000

async function startServer () {
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
  })
  await initDb()
  await setupProducer()
  await consumeData()
}

void startServer()
