import { type Request, type Response, type NextFunction } from 'express'
import logger from '../configs/logger'
// Define an async error handling middleware
const asyncErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  // Handle the error here
  logger.error(error)

  // You can customize the error response based on your requirements
  res.status(500).json({ error: 'Internal Server Error' })
}

export default asyncErrorHandler
