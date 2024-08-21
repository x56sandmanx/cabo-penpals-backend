import express from 'express'
import dotenv from 'dotenv'

import { addFavoriteSQL, getUserFavoritesSQL, removeFavoriteSQL } from './utilities/SQL/SQLFunctions.js'

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

app.get('/api/getUserFavorites', async (req, res) => {
  try {
    if(!req.query.userId)
      return res.status(400).json({response: {error: 'Missing/Incorrect Parameters'}})

    const userFavoritesResponse = await getUserFavoritesSQL(req.query.userId)
    return res.status(200).json({response: userFavoritesResponse})
  } catch (error) {
    return res.status(400).json({response: {error: 'Error Getting User Favorites: '+error.stack}})
  }
})

app.post('/api/addFavorite', async (req, res) => {
  try {
    if(!req.body)
      return res.status(400).json({response: {error: 'Missing/Incorrect Parameters'}})

    await addFavoriteSQL(req.body)
    return res.status(200).json({response: 'Favorite Added.'})
  } catch (error) {
    return res.status(400).json({response: {error: 'Error Adding Favorite: '+error.stack}})
  }
})

app.delete('/api/removeFavorite', async (req, res) => {
  try {
    if(!req.body)
      return res.status(400).json({response: {error: 'Missing/Incorrect Parameters'}})

    await removeFavoriteSQL(req.body)
    return res.status(200).json({response: 'Favorite Removed.'})
  } catch (error) {
    return res.status(400).json({response: {error: 'Error Removing Favorite: '+error.stack}})
  }
})

app.listen(process.env.PORT, '::', () => {
  console.log(`server listening on ${process.env.PORT}`)
})