import React, { useEffect, useState, useRef } from "react";
import { Question } from './Question'
import { Summary } from './Summary';
import { Sanctions } from './Sanctions';
import { SanctionsSummary } from './SanctionsSummary';
import {getQuestions} from '../services/question-service.js'

export function SinglePlayerGame({multiplayerStartGame, singlePlayerStartGame, gameStarted}) {

    //console.log('Se renderiza el componente SinglePlayerGame');

    const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
    const [questions, setQuestions] = useState();
    const [cuestionsAsked, setCuestionsAsked] = useState();
    const [cuestionNotAsked, setCuestionNotAsked] = useState();
    const [answers, setAnswers] = useState();
    const [reloadQuestions, setReloadQuestions] = useState(false);
    const [showQuestion, setShowQuestion] = useState(true);
    const [started, setStarted] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [sanctions, setSanctions] = useState(0);
    const [showSanctions, setShowSanctions] = useState(false);
    const [lives, setLives] = useState();

    const points = useRef(0);
    const bonusPoints = 2;
    const sanctionMultiplicatorPoints = 3;
    const rightAnswerPoints = 25;

    

    const [navBarstate, setNavBarstate] = useState('homeNavBarButton');


    useEffect(() => {
        //console.log('SinglePlayerGame -> Se ejecuta useEffect');

        async function fetchQuestionData() {
            const response = await getQuestions();
            // Clona desde el índice 0 hasta el 5 (sin incluir el 5)
            // TODO - Probando aplicativo. Cuando se termine, pasarle toda la info (response) al initialConfig.
            const clonaPrimeros5 = response.slice(0, 5);
            console.log("response getQuestions: ", clonaPrimeros5);
            initialConfig(clonaPrimeros5);
        }

        fetchQuestionData();
        
    }, [reloadQuestions]);

    const initialConfig = (data) => {

        //console.log('Se ejecuta initialConfig');
        
        setQuestions(data);

        let QUESTIONS_NUMBER = 0;
        let LIVES = 3;
        
        let initialAnswers = [];
        let initialLives = [];
        let cuestionsAskedArray = [];
        let indexQuestionInitial = 0;
        let cuestionNotAskedInitial = {};

        QUESTIONS_NUMBER = data.length;
        console.log("QUESTIONS NUMBER: " + QUESTIONS_NUMBER);
        initialAnswers = Array(QUESTIONS_NUMBER).fill('notAnswered');
        initialLives = Array(LIVES).fill(true);
    
        // get first random question index
        indexQuestionInitial = Math.floor(Math.random() * QUESTIONS_NUMBER);
        cuestionNotAskedInitial = data[indexQuestionInitial];
        //cuestionsAskedArray.push(cuestionNotAskedInitial.id);

        // set initial position
        setCuestionNotAsked(cuestionNotAskedInitial);
        setCuestionsAsked(cuestionsAskedArray);
        setAnswers(initialAnswers);
        setShowQuestion(true);
        setShowSummary(false);
        setSanctions(0);
        setShowSanctions(false);
        setLives(initialLives);
        points.current = 0;
    }
  
    const startGame = () => {
        resetGame(true);
        //singlePlayerStartGame();
    }

    const resumeGame = () => {
        setShowSanctions(false);
    }

    const resetGame = (event) => {

        //setStarted(true);
        
        if (event !== true) {
            if (reloadQuestions === true) {
                setReloadQuestions(false);
            }else{
                setReloadQuestions(true);
            }            
        }
    }

    const calculateSecondsPoints = (secondsToGo) => {
        return secondsToGo * bonusPoints
    }

    const updateQuestion = (indexQuestion, indexAnswer, seconds) => {

        // Se actualiza el número de preguntas contestadas
        setTotalQuestionsAnswered(prev => prev + 1);

        // Añadimos la pregunta a las preguntas realizadas
        let cuestionsAskedCopy = [...cuestionsAsked];
        cuestionsAskedCopy.push(indexQuestion);
        setCuestionsAsked(cuestionsAskedCopy);
        
        // Check if the response answered is right (comparing answer value with correctAnswer)
        const answerCorrect = questions.findIndex(item => item.id_question === indexQuestion);
        let answer = questions[answerCorrect].correct_answer;
        let resultAnswer;
        
        if (indexAnswer === answer) {
            resultAnswer = 'correct';
        } else {
            resultAnswer = 'incorrect';
        }

        let answersCopy = [...answers];
        answersCopy[totalQuestionsAnswered] = resultAnswer;
        setAnswers(answersCopy);

        let currentSanctions = sanctions;
        let currentLives = lives;

        // Extraer preguntas no realizadas
        let questionsNotAsked = questions.filter((question) => !cuestionsAskedCopy.includes(question.id_question));

        // Si la respuesta es incorrecta, sumamos una sanción
        if (resultAnswer === 'incorrect') {
            currentSanctions = currentSanctions + 1;

            for (let i = 0; i < currentLives.length; i++) {
                if (currentLives[i] === true) {
                    currentLives[i] = false;
                    break;
                }
            }

            //console.log('currentLives: ', currentLives);
            setLives(currentLives);

            // Restamos puntos por sanción
            points.current = points.current - (rightAnswerPoints * sanctionMultiplicatorPoints);
            setSanctions(currentSanctions);
            if (currentSanctions > 0 && currentSanctions < 3) {
                setShowSanctions(true);
            }
        }else{
            points.current = points.current + rightAnswerPoints + calculateSecondsPoints(seconds);
        }

        // No hay más cuestiones o hemos respondido a todas las preguntas o hemos tenido más de dos sanciones,
        // el juego termina.
        

        if (
        questionsNotAsked.length === 0 ||
        cuestionsAskedCopy.length === questions.length ||
        currentSanctions > 2
        ) {
        setShowQuestion(false);
        setShowSummary(true);
        setStarted(false);
        //setReloadQuestions(true);
        }

        
        
        let questionNotAsked = questionsNotAsked[Math.floor(Math.random() * questionsNotAsked.length)];
        setCuestionNotAsked(questionNotAsked);

        console.log("questionsNotAsked", questionsNotAsked.length);
        console.log("questions", questions.length);
        console.log("cuestionsAskedCopy", cuestionsAskedCopy.length);

        
    };

    if (gameStarted === true) {
        startGame();
    }

    //const [numberPlayers, setNumberPlayersState] = useState(1);
    //const [showButton, setShowButton] = useState(false);
      
    return (
        <>    
    
        <main className='board'>
            
            {gameStarted && showQuestion && !showSanctions && <Question questionNumber={cuestionsAsked.length} question={cuestionNotAsked} updateQuestion={updateQuestion} lives={lives}  />}
            {/*{gameStarted && showQuestion && !showSanctions ? <h2 className='points_accumulated'>📊 Puntuación: {points.current} </h2>:null}*/}
            {/*{gameStarted && !showSanctions && <Sanctions SanctionsNumber={sanctions} />}*/}
            {showSummary && <Summary totalQuestionsNumber={questions.length} answers={answers} points={points.current} resetGame={resetGame}></Summary>}
            {showSanctions && <SanctionsSummary SanctionsNumber={sanctions}></SanctionsSummary>}
            
            {showSanctions ?
              <button className='btn' onClick={resumeGame}>Entendido señor colegiado. ¡Pulse para continuar!</button>
              :null}

        </main>
        </>
      )
}