import express from 'express'

export const inworldv1Router = express.Router()

inworldv1Router.get('/test', (req, res) => {
  return res.status(200).json({ response: 'OK' })
})