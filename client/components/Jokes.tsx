import { getJoke } from '../jokesApiClient.ts'
import { useQuery } from '@tanstack/react-query'

const Jokes = () => {

  const {
    data,
    isError,
    isPending,
  } = useQuery({ queryKey: ['jokes'], queryFn: getJoke })

  if (isPending) return <p>Finding a great Norris Chuckler...</p>
  if (isError) return <p>Awwwwwwwwww rats. Not today.</p>

  if (data)  {
    return (
      <div>
        {data.value}
      </div>
    )
  }
}

export default Jokes
