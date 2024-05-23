import { useQuery } from "@tanstack/react-query"
import { getJokesVault } from "../apiClient"


const JokesVault = () => {
  const { 
    data, isPending, isError
  } = useQuery({queryKey: ['jokesvault'], queryFn: getJokesVault})
  
  if (isPending) return <p>Where are those vaulted jokes....</p>
  if (isError) return <p>Yeah... could not find them.</p>
  if (data) console.log(data)
  if (data && data.jokes && data.jokes.length > 0) {
    return (
      <div>
        <ul>
          {data.jokes.map((joke) => (
            <li key = {joke}>{joke}</li> 
          ))}
        </ul>
      </div>
    )
  }
} 

export default JokesVault
