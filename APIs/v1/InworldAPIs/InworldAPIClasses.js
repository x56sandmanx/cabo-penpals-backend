export class InworldCharacter {
  commonKnowledge

  constructor(inworldCharacter = {}) {
    this.commonKnowledge = inworldCharacter.commonKnowledge ? [...inworldCharacter.commonKnowledge] : []
  }
}