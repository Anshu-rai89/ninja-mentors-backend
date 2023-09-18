import mongoose from 'mongoose'
import logger from './logger'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async () => {
  try {
    const mongoUri = (process.env.MONGO_URI ?? '')
    // Connect to MongoDB
    await mongoose.connect(mongoUri)
    logger.info('DB connected')
  } catch (error: any) {
    logger.error(`Error -> ${error}`)
  }
}
