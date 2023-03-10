import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Square } from './components/Square.jsx'
import data from './assets/questions/questions.json';
import { Question } from './components/Question'

function App() {

  console.log('Se renderiza el componente App');

  let questions = data;
  let initialPositions = Array(10).fill(false);
  let initialAnswers = Array(10).fill('notAnswered');
  
  // get first random question
  let cuestionsAskedArray = [];
  const maxNumber = questions.length;
  let indexQuestionInitial = Math.floor(Math.random() * maxNumber);
  let cuestionNotAskedInitial = questions[indexQuestionInitial];
  cuestionsAskedArray.push(cuestionNotAskedInitial.id);

  // set initial position
  initialPositions[0] = true;

  const [positions, setPositions] = useState(initialPositions);
  const [showQuestion, setShowQuestion] = useState(true);
  const [cuestionsAsked, setCuestionsAsked] = useState(cuestionsAskedArray);
  const [cuestionNotAsked, setCuestionNotAsked] = useState(cuestionNotAskedInitial);
  const [answers, setAnswers] = useState(initialAnswers);
  const [started, setStarted] = useState(false);

  const startGame = () => {
    resetGame();
  }

  const resetGame = () => {
    setStarted(true);
    setPositions(initialPositions);
    setAnswers(initialAnswers);
    setCuestionNotAsked(cuestionNotAskedInitial);
    setCuestionsAsked([]);
    setShowQuestion(true);
  }


  const updateQuestion = (indexQuestion, indexAnswer) => {
    
    // get current true position: marcamos la siguiente posición
    const currentTruePosition = positions.findIndex((position) => position === true);
    console.log('currentTruePosition: ', currentTruePosition);
    
    const newPositions = Array(10).fill(false);
    newPositions[currentTruePosition+1] = true;
    setPositions(newPositions);

    

    // TODO - AAC - Añadimos la pregunta a las preguntas realizadas - Revisar esto puede que sobre
    let cuestionsAskedCopy = [...cuestionsAsked];
    cuestionsAskedCopy.push(indexQuestion);
    setCuestionsAsked(cuestionsAskedCopy);
    

    

    // compare answer with correctAnswer
    const answerCorrect = questions.findIndex(item => item.id === indexQuestion);
    let answer = questions[answerCorrect].correctAnswer;
    let resultAnswer;
    
    if (indexAnswer === answer) {
      resultAnswer = 'correct';
    } else {
      resultAnswer = 'incorrect';
    }

    let answersCopy = [...answers];
    answersCopy[currentTruePosition] = resultAnswer;
    setAnswers(answersCopy);

    // Extraer cuestiones no realizadas
    let questionsNotAsked = questions.filter((question) => !cuestionsAskedCopy.includes(question.id));
    // Obtenemos cuestión al azar de todas las que no se han realizado

    if (questionsNotAsked.length === 0) {
      setShowQuestion(false);
      setStarted(false);
    }
    
    let questionNotAsked = questionsNotAsked[Math.floor(Math.random() * questionsNotAsked.length)];
    setCuestionNotAsked(questionNotAsked);
    //console.log('cuestionNotAsked: ', questionNotAsked.id);

    // get answer of indexQuestion


    
  };

  return (
    <main className='board'>
        <img src={reactLogo} alt='React Logo' />
        
      <h2 className='gameTitle'> Penaltis y cuestiones</h2>

      {started === true ? 
      
        <section className='game'>
        
            {
              
              positions.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    status={answers[index]}
                    //throwQuestion={throwQuestion}
                    isSelected={square}
                  >
                    {index}
                  </Square>
                )
              })
            }
        </section>
        : <button className='btn' onClick={startGame}>¡Pulsa para comenzar!</button> }
          {started && showQuestion && <Question question={cuestionNotAsked} updateQuestion={updateQuestion} />}
    </main>
  )
}

export default App
