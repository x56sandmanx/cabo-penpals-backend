import sql from 'mysql2'
import { CaboTranslateTokens, FavoriteInfo } from './SQLClasses.js'
import { randomUUID } from 'crypto'

const pool = sql.createPool({
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

export async function updateCaboTranslateTokensSQL(_caboTranslateTokens) {
  const caboTranslateTokens = new CaboTranslateTokens(_caboTranslateTokens)

  await pool.query(`
    UPDATE caboAPITokens
    SET accessToken = ?, refreshToken = ?
    WHERE apiType = 'translate'  
  `, [caboTranslateTokens.accessToken, caboTranslateTokens.refreshToken])
}

export async function getUserFavoritesSQL(userId) {
  const [userFavorites] = await pool.query(`
    SLEECT *
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