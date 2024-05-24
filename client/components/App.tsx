import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
import Quiz from './Quiz'

const App = () => {
  const [page, setPage] = useState('home')

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-semibold">Word Chuck</h1>
      </header>
      <Quiz />
    </div>
  )
}

export default App
