import { getJoke, getJokesList } from '../apiClient.ts'
import { useQuery, useState } from '@tanstack/react-query'

const Jokes = () => {
  const [jokes, setJokes] = useState([])
  const [jokeCounter, setJokeCounter] = useState(0)

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['jokes'], 
    queryFn: getJoke,
    staleTime: Infinity,
    enabled: jokeCounter < 10,
    onSuccess: (data) => {
      setJokes((prevJokes: string[]) => [...prevJokes, data.value])
      setJokeCounter((prevJokeCounter: number) => prevJokeCounter++)
    }
  })
  if (isPending) console.log("Loading Jokes...")
  if (isError) console.log("Got an error while trying to load jokes:", error)
 
  if (jokes && jokes.length == 10) return jokes
}

export default Jokes
