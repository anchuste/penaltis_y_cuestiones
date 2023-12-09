import { useState, useRef } from 'react'
import data from './assets/questions/questions.json';
import { Question } from './components/Question'
import { Summary } from './components/Summary';
import { NavBar } from './components/NavBar';
import { Sanctions } from './components/Sanctions';
import { SanctionsSummary } from './components/SanctionsSummary';
import { SupportForm } from './components/SupportForm';
import { Ranking } from './components/Ranking';
import BuyACoffee from './components/BuyACoffee';
import { ShowIconHeader } from './components/ShowIconHeader';
import { TestQuestion } from './components/TestQuestion';


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
  const [sanctions, setSanctions] = useState(0);
  const [showSanctions, setShowSanctions] = useState(false);
  
  const [timer, setTimer] = useState(0);
  const points = useRef(0);

  const bonusPoints = 2;
  const sanctionMultiplicatorPoints = 3;
  const rightAnswerPoints = 25;
  

  const [navBarstate, setNavBarstate] = useState('homeNavBarButton');

  
  
  const handleNavBarState = (newNavBarState) => {
    setNavBarstate(newNavBarState);
  }

  const startGame = () => {
    resetGame(null);
  }

  const resumeGame = () => {
    setShowSanctions(false);
  }


  const resetGame = () => {
    setStarted(true);
    setPositions(initialPositions);
    setAnswers(initialAnswers);
    setCuestionNotAsked(cuestionNotAskedInitial);
    setCuestionsAsked([]);
    setShowQuestion(true);
    setShowSummary(false);
    setSanctions(0);
    setShowSanctions(false);
    points.current = 0;
  }


  const calculateSecondsPoints = (secondsToGo) => {
    return secondsToGo * bonusPoints
  }


  const updateQuestion = (indexQuestion, indexAnswer, seconds) => {

    // get current true position: marcamos la siguiente posición
    const currentTruePosition = positions.findIndex((position) => position === true);
    //console.log('currentTruePosition: ', currentTruePosition);
    
    const newPositions = Array(QUESTIONS_NUMBER).fill(false);
    newPositions[currentTruePosition+1] = true;
    setPositions(newPositions);
  

    // Añadimos la pregunta a las preguntas realizadas
    let cuestionsAskedCopy = [...cuestionsAsked];
    cuestionsAskedCopy.push(indexQuestion);
    setCuestionsAsked(cuestionsAskedCopy);
    
    // Check if the response answered is right (comparing answer value with correctAnswer)
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

    let currentSanctions = sanctions;

    // Extraer preguntas no realizadas
    let questionsNotAsked = questions.filter((question) => !cuestionsAskedCopy.includes(question.id));

    // Si la respuesta es incorrecta, sumamos una sanción
    if (resultAnswer === 'incorrect') {
      currentSanctions = currentSanctions + 1;
      // Restamos puntos por sanción
      points.current = points.current - (rightAnswerPoints * sanctionMultiplicatorPoints);
      setSanctions(currentSanctions);
      if (currentSanctions > 0 && currentSanctions < 3) {
        setShowSanctions(true);
      }
    }else{
      //console.log('seconds to go: ', seconds);
      points.current = points.current + rightAnswerPoints + calculateSecondsPoints(seconds);
      //console.log('points: ', points);
    }

    

    // No hay más cuestiones o hemos respondido a todas las preguntas o hemos tenido más de dos sanciones,
    // el juego termina.
    if (
      questionsNotAsked.length === 0 ||
      cuestionsAskedCopy.length === QUESTIONS_NUMBER ||
      currentSanctions > 2
      ) {
      setShowQuestion(false);
      //console.log('answersCopy', answersCopy);
      setShowSummary(true);
      setStarted(false);
    }

    
    
    let questionNotAsked = questionsNotAsked[Math.floor(Math.random() * questionsNotAsked.length)];
    setCuestionNotAsked(questionNotAsked);

    
  };

  return (
    <>

        
        <NavBar showNavbarWhilePlaying={started} handleNavBarState={handleNavBarState} />
        
    
    <main className='board'>
        
        <ShowIconHeader started={started} showSummary={showSummary} navBarstate={navBarstate}></ShowIconHeader>

        {navBarstate === 'supportNavBarButton' && <SupportForm></SupportForm>}
        
        {navBarstate === 'homeNavBarButton' && started && showQuestion && !showSanctions && <Question questionNumber={cuestionsAsked.length+1} question={cuestionNotAsked} updateQuestion={updateQuestion} />}
        {navBarstate === 'homeNavBarButton' && started && showQuestion && !showSanctions ? <h2 className='points_accumulated'>📊 Puntuación: {points.current} </h2>:null}
        {navBarstate === 'homeNavBarButton' && started && !showSanctions && <Sanctions SanctionsNumber={sanctions} />}
        {navBarstate === 'homeNavBarButton' && showSummary && <Summary totalQuestionsNumber={QUESTIONS_NUMBER} answers={answers} points={points.current} resetGame={startGame}></Summary>}
        {navBarstate === 'homeNavBarButton' && showSanctions && <SanctionsSummary SanctionsNumber={sanctions}></SanctionsSummary>}


        {(started === false && navBarstate === 'homeNavBarButton' && !showSummary)?
          <>
          <Ranking points={5} title={"TOP 5"}></Ranking>
          </>
          :null}
        
        {started === false &&  navBarstate === 'homeNavBarButton' && !showSummary ?
          <>
          <button className='board_button_start' onClick={startGame}>¡Comenzar partida!</button>
          </>
          :null}
        
        {showSanctions ?
          <button className='btn' onClick={resumeGame}>Entendido señor colegiado. ¡Pulse para continuar!</button>
          :null}

        {navBarstate === 'rankingNavBarButton'  ?
          <>
          <Ranking points={10} title={"Clasificación"}></Ranking>
          </>
          :null}
        
        {navBarstate === 'buyaCoffeeBarButton' ?
          <>
          <BuyACoffee></BuyACoffee>
          </>
          :null}

        {navBarstate === 'instructionsNavBarButton'  ?
          <>
          <TestQuestion questionIndex={0} ></TestQuestion>
          </>
          :null}

        
    </main>
    </>
  )
}

export default App
