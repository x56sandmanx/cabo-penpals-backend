import express from 'express'
import { InworldCharacter, InworldKnowledge, UpdateInworldCharacter } from './InworldAPIClasses.js'

export const inworldv1Router = express.Router()

inworldv1Router.get('/getCharacter', async (req, res) => {
  try {
    if (!req.query.characterId)
      return res.status(400).json({ response: { error: 'Missing/Incorrect Parameters' } })

    const inworldCharacterResponse = await getInworldCharacter(req.query.characterId)
    return res.status(200).json({ response: inworldCharacterResponse })
  } catch (error) {
    return res.status(500).json({ response: { error: 'Error Getting Character: ' + error.stack } })
  }
})

inworldv1Router.put('/updateCharacter', async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ response: { error: 'Missing/Incorrect Parameters' } })

    await updateInworldCharacter(new UpdateInworldCharacter(req.body))
    return res.status(200).json({ response: 'Updated Character.' })
  } catch (error) {
    return res.status(500).json({ response: { error: 'Error Updating Character: ' + error.stack } })
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

    inworldCharacterData.commonKnowledge = characterKnowledge
    return { inworldCharacter: inworldCharacterData }
  } else
    return { inworldCharacter: {} }
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
    const inworldKnowledge = new InworldKnowledge(inworldKnowledgeData)
    return { inworldKnowledge: inworldKnowledge }
  } else
    return { inworldKnowledge: [] }
}

/**
 * @param {UpdateInworldCharacter} inworldCharacter 
 */
async function updateInworldCharacter(inworldCharacter) {
  const commonKnowledge = inworldCharacter.commonKnowledge
  delete inworldCharacter.commonKnowledge

  const updateInworldCharacterResponse = await fetch(process.env.INWORLD_API_DOMAIN + inworldCharacter.name, {
    method: 'PATCH',
    headers: {
      'Grpc-Metadata-X-Authorization-Bearer-Type': 'studio_api',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.INWORLD_BASE_64_KEY}`
    },
    body: JSON.stringify(
      inworldCharacter
    )
  })

  if (updateInworldCharacterResponse.ok) {
    const updateInworldCharacterData = await updateInworldCharacterResponse.json()
    if (!updateInworldCharacterData.message) {
      await fetch(process.env.INWORLD_API_DOMAIN + inworldCharacter.name + ':deploy', {
        method: 'POST',
        headers: {
          'Grpc-Metadata-X-Authorization-Bearer-Type': 'studio_api',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.INWORLD_BASE_64_KEY}`
        }
      })

      for (const _inworldKnowledge of commonKnowledge) {
        const inworldKnowledge = new InworldKnowledge(_inworldKnowledge)
        await updateInworldKnowledge(inworldKnowledge)
      }
    }
  }
}

/**
 * 
 * @param {InworldKnowledge} inworldKnowledge 
 */
async function updateInworldKnowledge(inworldKnowledge) {
  const updateInworldKnowledgeResponse = await fetch(process.env.INWORLD_API_DOMAIN + inworldKnowledge.name, {
    method: 'PATCH',
    headers: {
      'Grpc-Metadata-X-Authorization-Bearer-Type': 'studio_api',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.INWORLD_BASE_64_KEY}`
    },
    body: JSON.stringify(
      inworldKnowledge
    )
  })

  if (updateInworldKnowledgeResponse.ok) {
    const updateInworldKnowledgeData = await updateInworldKnowledgeResponse.json()
    if (!updateInworldKnowledgeData.message) {
      await fetch(process.env.INWORLD_API_DOMAIN + inworldKnowledge.name + ':deploy', {
        method: 'POST',
        headers: {
          'Grpc-Metadata-X-Authorization-Bearer-Type': 'studio_api',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.INWORLD_BASE_64_KEY}`
        }
      })
    }
  }
}