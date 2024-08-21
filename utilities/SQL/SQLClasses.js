export class FavoriteInfo {
  userId
  characterId

  constructor(favoriteInfoData = {}) {
    this.userId = favoriteInfoData.userId ? String(favoriteInfoData.userId) : ''
    this.characterId = favoriteInfoData.characterId ? String(favoriteInfoData.characterId) : ''
  }
}