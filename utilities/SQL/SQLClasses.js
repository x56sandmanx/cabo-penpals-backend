export class CaboTranslateTokens {
  accessToken
  refreshToken

  constructor(caboTranslateTokensData = {}) {
    this.accessToken = caboTranslateTokensData.accessToken ? String(caboTranslateTokensData.accessToken) : ''
    this.refreshToken = caboTranslateTokensData.refreshToken ? String(caboTranslateTokensData.refreshToken) : ''
  }
}

export class FavoriteInfo {
  userId
  characterId

  constructor(favoriteInfoData = {}) {
    this.userId = favoriteInfoData.userId ? String(favoriteInfoData.userId) : ''
    this.characterId = favoriteInfoData.characterId ? String(favoriteInfoData.characterId) : ''
  }
}