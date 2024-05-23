import { Router } from 'express'
import fs from 'node:fs/promises'
import Path from 'path'
import type {JokesVault} from '../../models/jokes.ts'

const router = Router()
const filePath = Path.resolve('./data/jokesvault.json')

async function getJokesVaultFile(): Promise<JokesVault> {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Issue reading the jokesvault file:', error)
    return {jokes: []}
  }
}

async function addJokeToVault(joke: string) {
  try {
    const data = await getJokesVaultFile()
    data.jokes.push(joke)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Issue writing the jokesvault file:', error)
    throw new Error("Couldn't write the jokesvault file")
  }
}

router.get('/', async (req, res) => {
  try {
    const data = await getJokesVaultFile()
    res.json(data.jokes)
  } catch (error) {
    console.error("Error with router.get jokesvault:", error)
    res.status(500).json({"error": "Internal server error reading jokesvault"})
  }
})

router.post('/', async (req, res) => {
  try {
    const joke = req.body.joke
    if (!joke) return res.status(500).json({error: "Joke not passed through req.body"})
    await addJokeToVault(req.body.joke)
  } catch (error) {
    console.error("Error with router.post jokesvault:", error)
    res.status(500).json({"error": "Internal server error writing jokesvault"})
  }
})

export default router