import sql from 'mysql2'
import dotenv from 'dotenv'
import { FavoriteInfo } from './SQLClasses.js'
import { randomUUID } from 'crypto'

dotenv.config()

const pool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise()

export async function getUserFavoritesSQL(userId) {
  const [userFavorites] = await pool.query(`
    SELECT *
    FROM userFavorites
    WHERE userId = ?  
  `, [userId])

  return {userFavorites: userFavorites}
}

export async function addFavoriteSQL(_favoriteInfo) {
  const favoriteInfo = new FavoriteInfo(_favoriteInfo)

  await pool.query(`
    INSERT INTO userFavorites
    VALUES (?, ?, ?)  
  `, [randomUUID(), favoriteInfo.characterId, favoriteInfo.userId])
}

export async function removeFavoriteSQL(_favoriteInfo) {
  const favoriteInfo = new FavoriteInfo(_favoriteInfo)

  await pool.query(`
    DELETE
    FROM userFavorites
    WHERE userId = ? AND characterId = ?  
  `, [favoriteInfo.userId, favoriteInfo.characterId])
}