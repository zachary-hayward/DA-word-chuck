import { useState, useEffect, Key } from 'react'
import request from 'superagent'
import { useQuery } from '@tanstack/react-query'

import { getJokesList } from '../apiClient.ts'

const Quiz = () => {
  const [chosenLevel, setChosenLevel] = useState<string | null>(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [jokes, setJokes] = useState<string[]>([])

  useEffect(() => {
    const getJokeList = async () => {
      try {
        const result = await getJokesList()
        setJokes(result)
      } catch (error) {
        console.error("Error getting JokeList:", error)
      }
    }
    getJokeList()
  }, [])

  useEffect(() => {
  const getRandomWords = async (): Promise<void> => {

    try {
      const result = await request 
        .get('https://twinword-word-association-quiz.p.rapidapi.com/type1/')
        .query({ level: chosenLevel, area: 'sat'})
        .set(
          'X-RapidAPI-Key',
          '3ca90152f0msha86109f176538a4p169f93jsn2e857e825d33',
        )
        .set('X-RapidAPI-Host', 'twinword-word-association-quiz.p.rapidapi.com')
        console.log(result.body)
        setWords(result.body)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(words && words.quizlist)
    if (chosenLevel) getRandomWords()
  }, [chosenLevel])

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setChosenLevel(e.target.value)
  }

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log([optionIndex, correctAnswer])
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
    }
  }

return (

  <div className="Quiz">

    <div className="Title">
    <h1 className= "custom-heading">Word Chuck</h1>
    <p className="m-10">WordChuck&apos;s no joke (but the jokes are!). Test your vocabulary faster than Chuck throws kicks. Score right, get a Norris joke so tough it could KO a rhino. Sharpen your mental skills and become a trivia Texas Ranger, Chuck Norris style!</p>
    </div>
    {!chosenLevel && <div className="level-select" className="bg-slate-300">
    <p className="m-10">Pick your WordChuck pain level (1-10): 1 is a gentle breeze, 10 is a Chuck Norris roundhouse kick to your vocabulary.</p>
    <select className="mx-10" name="levels" id="levels" value={chosenLevel ?? ''} onChange={handleChange}>
      <option value={''}>Select Dojo</option>
      <option value={'1'}>Dojo 1</option>
      <option value={'2'}>Dojo 2</option>
      <option value={'3'}>Dojo 3</option>
      <option value={'4'}>Dojo 4</option>
      <option value={'5'}>Dojo 5</option>
      <option value={'6'}>Dojo 6</option>
      <option value={'6'}>Dojo 7</option>
      <option value={'8'}>Dojo 8</option>
      <option value={'9'}>Dojo 9</option>
      <option value={'10'}>Dojo 10</option>
    </select>
    </div>}

    {chosenLevel && words && <div className="question">
      <h1 className="custom-heading">Welcome to Dojo: {chosenLevel}</h1>
      
      {words.quizlist.map((question: any, index: Key | null | undefined) => <div key={index} className='bg-black text-white m-10'>
        {question.quiz.map(clues => (
          <p key={clues}>{clues}</p>
        ))}
        
        <div className={"custom-button-quiz, mx-2, inline-flex"}>
          {question.option.map( (option, optionIndex) => (

            <div key={option} className="flex">
              <button className="custom-button-quiz"
              
                onClick={()=> checkAnswer(option, optionIndex + 1, question.correct)}
              >{option}</button>
            </div>

          ))}
        </div>
        
        
        <p>{question.correct}</p>
      </div>)}
    </div>}
  </div>
)

}

export default Quiz 