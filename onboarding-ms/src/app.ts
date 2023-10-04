import express from 'express'
import cors from 'cors'
import { errorHandler } from './middlewares'
import routes from './routes'

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
app.get('/onboarding/health', (req, res) => {
  res.send('Hello, From Onboarding Ms')
})
app.use('/onboarding/api/v1', routes)
app.use(errorHandler)

export default app
