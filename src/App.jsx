import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Square } from './components/Square.jsx'
import data from './assets/questions/questions.json';
import { Question } from './components/Question'

function App() {

  console.log('Se renderiza el componente App');

  let questions = data;
  let initialPositions = Array(10).fill(false);

  initialPositions[0] = true;
  const [positions, setPositions] = useState(initialPositions);
  const [showQuestion, setShowQuestion] = useState(true);
  
  const updateQuestion = () => {
    // get current true position
    const currentTruePosition = positions.findIndex((position) => position === true);
    const newPositions = Array(10).fill(false);
    newPositions[currentTruePosition+1] = true;
    setPositions(newPositions);
    //setShowQuestion(false);
  };

  return (
    <main className='board'>
        <img src={reactLogo} alt='React Logo' />
        
      <h2 className='gameTitle'> Penaltis y cuestiones</h2>

        <section className='game'>
            {
              positions.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    //throwQuestion={throwQuestion}
                    isSelected={square}
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
