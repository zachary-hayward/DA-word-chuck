import { Router } from 'express'
import request from 'superagent'

const router = Router()

router.get('/', async (req,res) => {
  try {
    const result = await request
      .get('https://api.chucknorris.io/jokes/random')
      .query({category: 'dev'})
    res.json(result.body)
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch jokes'})
  }
})

export default router