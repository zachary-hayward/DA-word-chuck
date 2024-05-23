import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import jokes from './routes/jokes.ts'
import jokesvault from './routes/jokesvault.ts'
import quiz from './routes/quiz.ts'

dotenv.config()

const server = express()

server.use(express.json())

server.use('/api/v1/jokes', jokes)
server.use('/api/v1/jokesvault', jokesvault)
server.use('/api/v1/quiz', quiz)

server.get('/api/v1/greeting', (req, res) => {
  const greetings = ['hola', 'hi', 'hello', 'howdy']
  const index = Math.floor(Math.random() * greetings.length)
  console.log(index)
  res.json({ greeting: greetings[index] })
})

server.use(express.json())
server.use(cors('*' as CorsOptions))

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
