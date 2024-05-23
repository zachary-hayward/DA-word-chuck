import { getJoke } from '../apiClient.ts'
import {postToJokesVault} from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'



const Jokes = () => {

  const {
    data,
    isError,
    isPending,
  } = useQuery({ queryKey: ['jokes'], queryFn: getJoke })

  if (isPending) return <p>Finding a great Norris Chuckler...</p>
  if (isError) return <p>Awwwwwwwwww rats. Not today.</p>
 
  const handleAddToVault = async () => {
    try {
      await postToJokesVault(data.value)
    } catch(error) {
      console.error("Couldn't post joke to vault", error)
    }
  }

  if (data)  {
    return (
      <div>
        {data.value}
        <button onClick={handleAddToVault}>Add Joke to Vault</button>
      </div>
    )
  }
  return null
}

export default Jokes
