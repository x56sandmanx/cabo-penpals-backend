import { sql } from '@vercel/postgres'

export async function getCaboTranslateTokensSQL() {
  const tokens = await sql`
    SELECT * 
    FROM caboapitokens 
    WHERE apitype = 'translate'
  `

  return tokens.rowCount > 0 ? tokens.rows[0] : {}
}

export async function updateCaboTranslateTokensSQL(caboTranslateTokens) {
  await sql`
    UPDATE caboapitokens 
    SET accesstoken = '${caboTranslateTokens.accessToken}', refreshtoken = '${caboTranslateTokens.refreshToken}' 
    WHERE apitype = 'translate'
  `
}

export async function getUserFavoritesSQL(userId) {
  const { userFavorites } = await sql`
    SELECT *
    FROM userFavorites
    WHERE userId = ${userId}
  `

  console.log(userFavorites)
}

/*import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()
let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise()

export async function getCaboTranslateTokensSQL() {
  const [tokens] = await pool.query(`
    SELECT *
    FROM caboAPITokens
    WHERE apiType = 'translate'
  `)

  return tokens[0]
}

export async function updateCaboTranslateTokensSQL(caboTranslateTokens) {
  await pool.query(`
    UPDATE caboAPITokens
    SET accessToken = ?, refreshToken = ?
    WHERE apiType = 'translate'  
  `, [caboTranslateTokens.accessToken, caboTranslateTokens.refreshToken])
}

export async function getUserFavoritesSQL(userId) {
  const [userFavorites] = await pool.query(`
    SELECT * 
    FROM userFavorites
    WHERE userId = ?
  `, [userId])

  return {userFavorites: userFavorites}
}*/