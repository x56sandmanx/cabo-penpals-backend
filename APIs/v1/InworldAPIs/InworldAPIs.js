import express from 'express'
import { InworldCharacter } from './InworldAPIClasses.js'

export const inworldv1Router = express.Router()

inworldv1Router.get('/getCharacter', async (req, res) => {
  try {
    if (!req.query.characterId)
      return res.status(400).json({ response: { error: 'Missing/Incorrect Parameters' } })

    const inworldCharacterResponse = await getInworldCharacter(req.query.characterId)
    return res.status(200).json({ response: { inworldCharacter: inworldCharacterResponse } })
  } catch (error) {
    return res.status(500).json({ response: { error: 'Error Getting Character: ' + error.stack } })
  }
})

/**
 * @param {String} characterId 
 */
async function getInworldCharacter(characterId) {
  const inworldCharacterResponse = await fetch(process.env.INWORLD_API_DOMAIN + characterId, {
    method: 'GET',
    headers: {
      'Grpc-Metadata-X-Authorization-Bearer-Type': 'studio_api',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.INWORLD_BASE_64_KEY}`
    }
  })

  if (inworldCharacterResponse.ok) {
    const inworldCharacterData = await inworldCharacterResponse.json()
    const inworldCharacter = new InworldCharacter(inworldCharacterData)
    const characterKnowledge = []

    for (const knowledge of inworldCharacter.commonKnowledge) {
      const inworldKnowledgeResponse = await getInworldKnowledge(knowledge)
      characterKnowledge.push(inworldKnowledgeResponse.inworldKnowledge)
    }
    return { character: inworldCharacterData, knowledge: characterKnowledge }
  } else
    return { character: {}, knowledge: [] }
}

/**
 * @param {String} knowledgeId 
 */
async function getInworldKnowledge(knowledgeId) {
  const inworldKnowledgeResponse = await fetch(process.env.INWORLD_API_DOMAIN + knowledgeId, {
    method: 'GET',
    headers: {
      'Grpc-Metadata-X-Authorization-Bearer-Type': 'studio_api',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.INWORLD_BASE_64_KEY}`
    }
  })

  if (inworldKnowledgeResponse.ok) {
    const inworldKnowledgeData = await inworldKnowledgeResponse.json()
    return { inworldKnowledge: inworldKnowledgeData }
  } else
    return { inworldKnowledge: {} }
}