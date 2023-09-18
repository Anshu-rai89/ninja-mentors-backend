import express from 'express'
import routes from './routes'
import asyncErrorHandler from './middleware/errorHandler'
import cors from 'cors'

const app = express()
const corsOptions = {
  // Specify the allowed origins. '*' allows all origins (not recommended for production).
  origin: '*', // Replace with your specific domain(s) or '*' for any origin.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers.
  credentials: true, // Enable CORS credentials (e.g., cookies and authentication headers).
  preflightContinue: false // Disable preflight requests.
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(asyncErrorHandler)
app.use('/api/v1', routes)
app.get('/health', (req, res) => {
  res.send('Hello, TypeScript Express!')
})

export default app
