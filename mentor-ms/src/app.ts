import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!')
})

export default app
