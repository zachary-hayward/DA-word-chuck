import request from 'superagent'
import type { Jokes, JokesVault } from '../models/jokes.ts'
import type { Quiz } from '../models/quiz.ts'

export async function getGreeting() {
  const res = await request.get('/api/v1/greeting')
  return res.body.greeting as string
}

export async function getJoke() {
  const res = await request.get('/api/v1/jokes')
  return res.body as Jokes
}

export async function getJokesList() {
  const jokes: string[] = []
  for (let i = 0; i < 10; i++) {
    try {
      const res = await request.get('/api/v1/jokes')
      jokes.push(res.body.value)
    } catch (error) {
      console.log("Error retrieving joke for jokeslist:", error)
    }
  }
  return jokes
}

export async function getJokesVault() {
  const res = await request.get('/api/v1/jokesvault')
  return res.body as JokesVault
}

export async function postToJokesVault(joke: string) {
  if (!joke) console.error("No joke received to postToJokesVault")
  console.log(joke)
  const res = await request
    .post('/api/v1/jokesvault')
    .send({joke})
  return res.body as JokesVault
}

export async function getQuiz(level?: string, area?: string) {
  const res = await request
    .get('/api/v1/quiz')
    .query({level, area})
  return res.body as Quiz
}
