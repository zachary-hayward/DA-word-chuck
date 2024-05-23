import { Router } from 'express'
import fs from 'node:fs/promises'
import Path from 'path'
import type {JokesVault} from '../../models/jokes.ts'

const router = Router()
const filePath = Path.resolve('./data/jokesvault.json')

async function getJokesVaultFile() {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return {jokes: []}
  }
}

async function writeJokesVaultFile(data: JokesVault) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

router.get('/', async (req, res) => {
  const data = await getJokesVaultFile()
  res.json(data.jokes)
})

router.post('/', async (req, res) => {
  const joke = req.query.joke
  const {jokes} = await getJokesVaultFile()
  if (jokes && joke) {
    jokes.push(joke)
    await writeJokesVaultFile({jokes})
    res.json({ message: "Added the joke to the Joke Vault"})
  }
  res.json({ message: "I don't think it got added"})
})

export default router