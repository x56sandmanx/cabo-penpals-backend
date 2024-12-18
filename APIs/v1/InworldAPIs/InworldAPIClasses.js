export class InworldCharacter {
  commonKnowledge

  constructor(inworldCharacter = {}) {
    this.commonKnowledge = inworldCharacter.commonKnowledge ? [...inworldCharacter.commonKnowledge] : []
  }
}

export class InworldKnowledge {
  name
  knowledgeRecords

  constructor(inworldKnowledge = {}) {
    this.name = inworldKnowledge.name ? String(inworldKnowledge.name) : ''
    this.knowledgeRecords = inworldKnowledge.knowledgeRecords ? [...inworldKnowledge.knowledgeRecords] : []
  }
}

export class UpdateInworldCharacter {
  name
  language
  defaultCharacterDescription
  defaultCharacterAssets
  initialMood
  personality
  commonKnowledge

  constructor(inworldCharacter = {}) {
    this.name = String(inworldCharacter.name ?? '')
    this.language = String(inworldCharacter.language ?? '')
    this.defaultCharacterDescription = new DefaultCharacterDescription(inworldCharacter.defaultCharacterDescription)
    this.defaultCharacterAssets = new DefaultCharacterAssets(inworldCharacter.defaultCharacterAssets)
    this.initialMood = new InitialMood(inworldCharacter.initialMood)
    this.personality = new Personality(inworldCharacter.personality)
    this.commonKnowledge = inworldCharacter.commonKnowledge ? [...inworldCharacter.commonKnowledge] : []
  }
}

class DefaultCharacterDescription {
  description
  pronoun
  personalityAdjectives

  constructor(defaultCharacterDescription = {}) {
    this.description = String(defaultCharacterDescription.description ?? '')
    this.pronoun = String(defaultCharacterDescription.pronoun ?? '')
    this.personalityAdjectives = defaultCharacterDescription.personalityAdjectives ? [...defaultCharacterDescription.personalityAdjectives] : []
  }
}

class DefaultCharacterAssets {
  voice

  constructor(defaultCharacterAssets = {}) {
    this.voice = new Voice(defaultCharacterAssets.voice)
  }
}

class Voice {
  baseName
  pitch
  speakingRate

  constructor(voice = {}) {
    this.baseName = String(voice.baseName ?? '')
    this.pitch = Number(voice.pitch ?? 0)
    this.speakingRate = Number(voice.speakingRate ?? 0)
  }
}

class InitialMood {
  joy
  fear
  trust
  surprise

  constructor(initialMood = {}) {
    this.joy = Number(initialMood.joy ?? 0)
    this.fear = Number(initialMood.fear ?? 0)
    this.trust = Number(initialMood.trust ?? 0)
    this.surprise = Number(initialMood.surprise ?? 0)
  }
}

class Personality {
  positive
  peaceful
  open
  extravert

  constructor(personality = {}) {
    this.positive = Number(personality.positive ?? 0)
    this.peaceful = Number(personality.peaceful ?? 0)
    this.open = Number(personality.open ?? 0)
    this.extravert = Number(personality.extravert ?? 0)
  }
}