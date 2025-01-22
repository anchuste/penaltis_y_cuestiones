import { Square } from './Square.jsx'
import Countdown from 'react-countdown';
import * as constants from './../constants/index.js'
import { useState } from 'react';
import notAvailableImage from './../assets/imagen_no_disponible.png';
import PuffLoader from "react-spinners/PuffLoader";
import soccerFilled from '../assets/football.png';
import soccerEmpty from '../assets/empty_football - copia.png';





export const Question = ({ question, questionNumber, index, updateQuestion, lives }) => {

    console.log('************ Component Question loaded');

    console.log('questionNumber', questionNumber);

    console.log('lives', lives);
    

    question.answersFormatted = question.answers.split('**');

    const [animationResponse, setAnimationResponse] = useState('');
    const [showLoading, setShowLoading] = useState(true);

    console.log('animationResponse', animationResponse);
    console.log('showLoading', showLoading);

    // Loader CSS properties
    const CSSProperties = {
      display: "block",
      margin: "0 auto",
      marginTop: "1em",
      borderColor: "red",
    };

    let currentSeconds = 0;
    
    const analyzeAnswer = async (idQuestion, index, currentSeconds) => {

      if (index === question.correct_answer) {
        setAnimationResponse('correct');
      } else {
        setAnimationResponse('incorrect');
      }

      await sleep(175);
      setAnimationResponse('');
      setShowLoading(true);
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
            <img style={{display: showLoading ? "none" : "inline"}}
              className="question_image"
              src={question.image}
              onClick={() => setId(item?.id)}
              onLoad={() => setShowLoading(false)}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src= notAvailableImage;
              }}
            />:null
          }

          {animationResponse !== 'correct' && animationResponse !== 'incorrect' ?
            <img style={{display: showLoading ? "inline" : "none"}}
            />:null
            }

            
            
            <PuffLoader
            color={"papayawhip"}
            loading={showLoading}
            size={45}
            cssOverride={CSSProperties}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
            
            {showLoading ? <h3 className='loading_text'>Cargando imagen...</h3> : null}

          
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
          <h2 className='time_to_go_question_time'> Tiempo ⌚ </h2>
          
          <Countdown
              date={Date.now() + constants.TIME_TO_GO_QUESTIONS}
              renderer={renderer}
              onComplete={(event, api) => console.log('event api', api)}
              key={question.id_question}
          />
          </div>
          

          
          <div>

          

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
          {/*<h5 style={{marginTop: "8px"}}>Autor de la pregunta: {question.author}</h5>*/}

          <div>
            <h3 className='aciertos' > Aciertos: {questionNumber - 1}</h3>
          </div>

          

          <div style={{ display: "block", alignItems: "left" }}>
            {/* Texto "Vidas restantes" */}
            <span style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#FFF", // Ajusta este color según el diseño
              marginRight: "12px"
            }}>
              Vidas:
            </span>

          {
            lives.map(
              (live, index) => {
              return (

                <img
                  key={index}
                  src={soccerFilled}
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "4px",
                    opacity: live ? "1" : "0.2", // Cambia opacidad según el valor de live
                    marginTop: "8px"
                  }}
                  alt={live ? "Vida activa" : "Vida inactiva"}
                />
              )
            })
          }
          </div>
          
        </section>
        </div>
      
    )
}