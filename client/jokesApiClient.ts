import request from 'superagent'
import type { Jokes } from '../models/jokes.ts'

export async function getJoke() {
  const res = await request.get('/api/v1/jokes')
  return res.body as Jokes
}
