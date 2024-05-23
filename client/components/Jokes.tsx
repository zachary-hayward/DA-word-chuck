import { getJoke } from '../apiClient.ts'
import { useQuery, useMutation } from '@tanstack/react-query'
import JokesVault from '../components/JokesVault.tsx'
import {addToJokesVault} from '../apiClient.ts'

const Jokes = () => {

 
  const {
    data,
    isError,
    isPending,
  } = useQuery({ queryKey: ['jokes'], queryFn: getJoke })

  const [mutate] = useMutation(addToJokesVault)

  const handleAddToVault = () => {
    mutate(data?.value)
  }

  if (isPending) return <p>Finding a great Norris Chuckler...</p>
  if (isError) return <p>Awwwwwwwwww rats. Not today.</p>

  if (data)  {
    return (
      <div>
        {data.value}
        <button onClick={handleAddToVault}>Add Joke to Vault</button>
        <JokesVault />
      </div>
    )
  }
  return null
}

export default Jokes
