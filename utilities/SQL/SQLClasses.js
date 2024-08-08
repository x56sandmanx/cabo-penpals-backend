export class CaboTranslateTokens {
  accessToken
  refreshToken

  constructor(caboTranslateTokensData = {}) {
    this.accessToken = caboTranslateTokensData.accesstoken ? String(caboTranslateTokensData.accesstoken) : ''
    this.refreshToken = caboTranslateTokensData.refreshtoken ? String(caboTranslateTokensData.refreshtoken) : ''
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