/* eslint-disable @typescript-eslint/explicit-function-return-type */
import app from './app'
import intiDb from '@configs/db'
import logger from '@configs/logger'

const port = process.env.PORT ?? 3000

async function startServer () {
  await intiDb()
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
  })
}

void startServer()
