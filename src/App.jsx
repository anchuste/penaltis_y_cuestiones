import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import trivialLogo from './assets/trivial_anchus_225.png'
import { Square } from './components/Square.jsx'
import data from './assets/questions/questions.json';
import { Question } from './components/Question'
import { Summary } from './components/Summary';

function App() {

  console.log('Se renderiza el componente App');

  let questions = data;
  const QUESTIONS_NUMBER = questions.length;
  let initialPositions = Array(QUESTIONS_NUMBER).fill(false);
  let initialAnswers = Array(QUESTIONS_NUMBER).fill('notAnswered');
  
  // get first random question
  let cuestionsAskedArray = [];
  let indexQuestionInitial = Math.floor(Math.random() * QUESTIONS_NUMBER);
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
  const [showSummary, setShowSummary] = useState(false);

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
    setShowSummary(false);
  }


  const updateQuestion = (indexQuestion, indexAnswer) => {
    
    // get current true position: marcamos la siguiente posición
    const currentTruePosition = positions.findIndex((position) => position === true);
    console.log('currentTruePosition: ', currentTruePosition);
    
    const newPositions = Array(QUESTIONS_NUMBER).fill(false);
    newPositions[currentTruePosition+1] = true;
    setPositions(newPositions);
  

    // Añadimos la pregunta a las preguntas realizadas
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
    if (questionsNotAsked.length === 0 ||cuestionsAskedCopy.length === QUESTIONS_NUMBER || resultAnswer === 'incorrect') {
      setShowQuestion(false);
      console.log('answersCopy', answersCopy);
      setShowSummary(true);
      setStarted(false);
    }
    
    let questionNotAsked = questionsNotAsked[Math.floor(Math.random() * questionsNotAsked.length)];
    setCuestionNotAsked(questionNotAsked);
    //console.log('cuestionNotAsked: ', questionNotAsked.id);

    // get answer of indexQuestion

    // https://www.ghanaiantimes.com.gh/wp-content/uploads/2019/11/Pele.jpg

    
  };

  return (
    <main className='board'>
        <img src={trivialLogo} style={{width: "70%", height: "30%"}} alt='Anchus logotipo' />
        
        {started && showQuestion && <Question questionNumber={cuestionsAsked.length+1} question={cuestionNotAsked} updateQuestion={updateQuestion} />}

        {showSummary && <Summary totalQuestionsNumber={QUESTIONS_NUMBER} answers={answers}></Summary>}

        {started === false ?
        <button className='btn' onClick={startGame}>¡Pulsa para comenzar una nueva partida!</button>:null}

        
    </main>
  )
}

export default App
