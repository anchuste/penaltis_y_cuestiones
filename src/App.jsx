import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Square } from './components/Square.jsx'
import data from './assets/questions/questions.json';
import { Question } from './components/Question'

function App() {

  let questions = data;
  console.log(questions);

  let positions = Array(10).fill(null);

  const [showQuestion, setShowQuestion] = useState(false);
  
  const updateQuestion = (index, indexCorrectAnswer) => {
    console.log('update question');
    console.log('index: ', index);
    console.log('indexCorrectAnswer: ', indexCorrectAnswer);
    setShowQuestion(false);
  };

  const throwQuestion = (index) => {
    console.log('throw question for index: ', index);
    setShowQuestion(true);
  }

  return (
    <main className='board'>
        <img src={reactLogo} alt='React Logo' />
        
      <h2 className='title_game'> Penaltis y cuestiones</h2>

        <section className='game'>
            {
              positions.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    throwQuestion={throwQuestion}
                  >
                    {index}
                  </Square>
                )
              })
            }
        </section>
          {showQuestion && <Question question={questions} updateQuestion={updateQuestion} />}
    </main>
  )
}

export default App
