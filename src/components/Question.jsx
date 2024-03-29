import { Square } from './Square.jsx'
import Countdown from 'react-countdown';
import * as constants from './../constants/index.js'
import { useState } from 'react';
import notAvailableImage from './../assets/imagen_no_disponible.png';


export const Question = ({ question, questionNumber, index, updateQuestion }) => {

    //console.log('Se renderiza el componente Question', question);

    question.answersFormatted = question.answers.split('**');

    const [animationResponse, setAnimationResponse] = useState('');


    let currentSeconds = 0;
    

    const analyzeAnswer = async (idQuestion, index, currentSeconds) => {

      if (index === question.correct_answer) {
        setAnimationResponse('correct');
      } else {
        setAnimationResponse('incorrect');
      }

      await sleep(175);
      setAnimationResponse('');
      updateQuestion(idQuestion, index, currentSeconds);
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Renderer callback with condition
    const renderer = ({ seconds, completed, api, props }) => {
      //console.log('seconds', seconds);
      currentSeconds = seconds;

      if (seconds <= 5) {
        
        if (seconds % 2 === 0) {
          return <h2 className='time_to_go_question_red' style={{color: "black"}}> {seconds} s. </h2>
        }

        return <h2 className='time_to_go_question_normal' style={{color: "red"}} > {seconds} s. </h2>
      }
      
      // Render a countdown
      return <h2 className='time_to_go_question_normal'> {seconds} s. </h2>
        
    };

    return (
      <div>

        
          {animationResponse !== 'correct' && animationResponse !== 'incorrect' ?
            <img src={question.image} className='question_image' alt='React Logo'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src= notAvailableImage;
            }} />:null
          }

          
          {animationResponse === 'correct' ?
            <>
            <h2 className='correct_answer' >¡CORRECTO!</h2>
            <img src={question.image} className='question_image' alt='React Logo' />
            </>
            : null
          }


          {animationResponse === 'incorrect' ?
            <>
            <h2 className='incorrect_answer' >¡INCORRECTO!</h2>
            <img src={question.image} className='question_image' alt='React Logo' />
            </>
            : null
          }
          

          <div>
          <h2 className='question_number' > Pregunta {questionNumber}</h2>
          </div>
          <div>
          <h2 className='time_to_go_question_time'> ⌚ </h2>
          
          <Countdown
              date={Date.now() + constants.TIME_TO_GO_QUESTIONS}
              renderer={renderer}
              onComplete={(event, api) => console.log('event api', api)}
              key={question.id_question}
          />

          </div>

          <h2 className='customDiv'>{question.question}</h2>
          <section>
          <ol>
          {
            question.answersFormatted.map(
              (answer, index) => {
              return (
                <li className='answers' key={index} onClick={() => analyzeAnswer(question.id_question, index, currentSeconds)}
                >
                  {answer}
                </li>
              )
            })
          }
          </ol>
          <h5 style={{marginTop: "8px"}}>Autor de la pregunta: {question.author}</h5>
        </section>
      </div>
    )
}