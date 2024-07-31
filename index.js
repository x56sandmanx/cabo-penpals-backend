import express from 'express'

import { getCaboTranslateTokensSQL, updateCaboTranslateTokensSQL } from './utilities/SQL/SQLFunctions.js'

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.get('/api/getCaboTranslateTokens', async (req, res) => {
  try {
    const tokens = await getCaboTranslateTokensSQL()
    return res.status(200).json({response: {tokens: tokens}})
  } catch (error) {
    return res.status(400).json({response: {error: 'Error Getting Cabo Translate Tokens: '+error.stack}})
  }
})

app.post('/api/updateCaboTranslateTokens', async (req, res) => {
  try {
    if(!req.body)
      return res.status(400).json({response: {error: 'Missing/Incorrect Parameters'}})

    await updateCaboTranslateTokensSQL(req.body)
    return res.status(200).json({response: 'Tokens Updated.'})
  } catch (error) {
    return res.status(400).json({response: {error: 'Error Updating Cabo Translate Tokens: '+error.stack}})
  }
})

app.listen(process.env.PORT, '::', () => {
  console.log(`server listening on ${process.env.PORT}`)
})