import express from 'express'
import dotenv from 'dotenv'
import { inworldv1Router } from './APIs/v1/InworldAPIs/InworldAPIs.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use('/api/v1/inworld', inworldv1Router)

app.listen(process.env.PORT, '::', () => {
  console.log(`server listening on ${process.env.PORT}`)
})