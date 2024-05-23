import request from 'superagent'
import type { Quiz } from '../models/quiz.ts'
import type { Jokes } from '../models/jokes.ts'

export async function getGreeting() {
  const res = await request.get('/api/v1/greeting')
  return res.body.greeting as string
}

export async function getQuiz() {
  const res = await request.get('/api/v1/quiz')
  return res.body as Quiz
}

export async function getJoke() {
  const res = await request.get('/api/v1/jokes')
  return res.body as Jokes
}
