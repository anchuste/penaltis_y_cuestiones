import React, { useEffect, useState, useRef } from "react";
import { Question } from './Question'
import { Summary } from './Summary';

import { SanctionsSummary } from './SanctionsSummary';
import {getQuestions} from '../services/question-service.js'

export function SinglePlayerGame({multiplayerStartGame, singlePlayerStartGame, gameStarted}) {

    console.log('Se renderiza el componente SinglePlayerGame: ' + gameStarted);

    const [questions, setQuestions] = useState();
    const [cuestionsAsked, setCuestionsAsked] = useState();
    const [cuestionNotAsked, setCuestionNotAsked] = useState();
    const [answers, setAnswers] = useState();
    const [reloadQuestions, setReloadQuestions] = useState(false);
    const [showQuestion, setShowQuestion] = useState(true);
    const [started, setStarted] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    //const [sanctions, setSanctions] = useState(0);
    const [showSanctions, setShowSanctions] = useState(false);
    const [lives, setLives] = useState();

    const points = useRef(0);
    const sanctions = useRef(0);
    const totalQuestionsAnswered = useRef(0);
    const bonusPoints = 2;
    const sanctionMultiplicatorPoints = 3;
    const rightAnswerPoints = 25;

    

    const [navBarstate, setNavBarstate] = useState('homeNavBarButton');


    useEffect(() => {

        console.log('componente SinglePlayerGame, use effect!!');

        async function fetchQuestionData() {

            const response = await getQuestions();
            console.log('componente SinglePlayerGame, use effect - fetchQuestionData');
            // Clona desde el índice 0 hasta el 5 (sin incluir el 5)
            // TODO - Probando aplicativo. Cuando se termine, pasarle toda la info (response) al initialConfig.
            const clonaPrimeros5 = response.slice(5, 10);
            initialConfig(clonaPrimeros5);
        }

        fetchQuestionData();
        
    }, [reloadQuestions]);

    const initialConfig = (data) => {

        console.log("Se ejecuta initialConfig!!");
        
        setQuestions(data);

        console.log("Se ejecuta initialConfig 2 parte!!");
        let QUESTIONS_NUMBER = 0;
        let LIVES = 3;
        
        let initialAnswers = [];
        let initialLives = [];
        let cuestionsAskedArray = [];
        let indexQuestionInitial = 0;
        let cuestionNotAskedInitial = {};

        QUESTIONS_NUMBER = data.length;
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
        setShowSanctions(false);
        setLives(initialLives);
        points.current = 0;
        sanctions.current = 0;
        totalQuestionsAnswered.current = 0;
    }

    const resumeGame = () => {
        setShowSanctions(false);
    }

    const resetGame = (event) => {

        // Este reloadQuestions hace que se ejecute el useEffect donde se cargan
        // las preguntas y se inicializa el juego initialConfig().
        
        if (reloadQuestions === true) {
            setReloadQuestions(false);
        }else{
            setReloadQuestions(true);
        }            
        
    }

    const calculateSecondsPoints = (secondsToGo) => {
        return secondsToGo * bonusPoints
    }

    const checkIfAnswerIsRight = (indexQuestion, indexAnswer)  => {
        
        const answerCorrect = questions.findIndex(item => item.id_question === indexQuestion);
        let answer = questions[answerCorrect].correct_answer;
        let resultAnswer;
        
        if (indexAnswer === answer) {
            resultAnswer = 'correct';
        } else {
            resultAnswer = 'incorrect';
        }

        return resultAnswer;

    }


    const addSanction = () => {
        sanctions.current = sanctions.current + 1;
    }

    const checkShowSanctions = () => {
        let currentSanctions = sanctions;

        if (sanctions.current > 0 && sanctions.current < 3){
            return true;
        }

        return false;
    }

    const restOneLive = () => {

        let currentLives = lives;

        for (let i = 0; i < currentLives.length; i++) {
                if (currentLives[i] === true) {
                    currentLives[i] = false;
                    break;
            }
        }

        setLives(currentLives);

    }

    // Comprueba si es el final del juego. Esto se da si el número de respuestas respondidas es igual al número de preguntas que hay.
    // O si existen más de 2 sanciones.
    const checkEndOfGame = () => {

        console.log("check end of game - totalQuestionsAnswered.current: " + totalQuestionsAnswered.current);

        if (totalQuestionsAnswered.current === questions.length || sanctions.current > 2 ) {
            setShowQuestion(false);
            setShowSummary(true);
            setStarted(false);
            setShowSanctions(false);
        }
    }

    // Añadimos la pregunta a las preguntas realizadas
    const addQuestionToDoneQuestions = (indexDoneQuestion) => {
        // Añadimos la pregunta a las preguntas realizadas
        let cuestionsAskedCopy = [...cuestionsAsked];
        cuestionsAskedCopy.push(indexDoneQuestion);
        setCuestionsAsked(cuestionsAskedCopy);

        return cuestionsAskedCopy;
    }

    // Añadimos la pregunta a las preguntas realizadas
    const getQuestionsNotAsked = (cuestionsAskedCopy) => {
        
        // Extraer array de preguntas no realizadas
        let questionsNotAsked = questions.filter((question) => !cuestionsAskedCopy.includes(question.id_question));
        
        return questionsNotAsked;
    }

    // Establecemos la siguiente cuestión a realizar
    const setNextCuestionToAsk = (questionsNotAsked) => {
        
        if (questionsNotAsked.length > 0)
        {
            let questionNotAsked = questionsNotAsked[Math.floor(Math.random() * questionsNotAsked.length)];
            setCuestionNotAsked(questionNotAsked);
        }
    }


    const updateQuestion = (indexQuestion, indexAnswer, seconds) => {



        // Se actualiza el número de preguntas contestadas
        totalQuestionsAnswered.current = totalQuestionsAnswered.current + 1;
        
        // Se añade la cuestión que se acaba de preguntar al array de preguntas hechas
        let cuestionsAskedCopy = addQuestionToDoneQuestions(indexQuestion);

        // Extraer array de preguntas no realizadas
        let questionsNotAsked = getQuestionsNotAsked(cuestionsAskedCopy);

        // Se establece la siguiente pregunta
        setNextCuestionToAsk(questionsNotAsked);
        
        // Check if the response answered is right (comparing answer value with correctAnswer)
        let resultAnswer = checkIfAnswerIsRight(indexQuestion, indexAnswer);
        let answersCopy = [...answers];
        answersCopy[totalQuestionsAnswered.current] = resultAnswer;
        setAnswers(answersCopy);

        // Si la respuesta es incorrecta, sumamos una sanción
        if (resultAnswer === 'incorrect') {

            addSanction();

            restOneLive();

            if (checkShowSanctions()){
                setShowSanctions(true);
            }   
        }

        // Comprobamos y finalizamos si es el final del juego. 
        checkEndOfGame();
        
        
    };

    

    //const [numberPlayers, setNumberPlayersState] = useState(1);
    //const [showButton, setShowButton] = useState(false);
      
    return (
        <>    
    
        <main className='board'>
            
            {gameStarted && showQuestion && !showSanctions && cuestionsAsked !== undefined && <Question questionNumber={cuestionsAsked.length} question={cuestionNotAsked} updateQuestion={updateQuestion} lives={lives}  />}
            {/*{gameStarted && showQuestion && !showSanctions ? <h2 className='points_accumulated'>📊 Puntuación: {points.current} </h2>:null}*/}
            {/*{gameStarted && !showSanctions && <Sanctions SanctionsNumber={sanctions} />}*/}
            {showSummary && <Summary totalQuestionsNumber={questions.length} answers={answers} points={points.current} resetGame={resetGame}></Summary>}
            {showSanctions && <SanctionsSummary SanctionsNumber={sanctions.current} Lives={lives}></SanctionsSummary>}
            
            {showSanctions ?
              <button className='btn' onClick={resumeGame}>Continuar partida</button>
              :null}

        </main>
        </>
      )
}