import { Square } from './Square.jsx'
import Countdown from 'react-countdown';
import * as constants from './../constants/index.js'

export const Question = ({ question, questionNumber, index, updateQuestion }) => {

    console.log('se renderiza Question');

    let currentSeconds = 0;


    // Random component
    const Completionist = () => {
      return <span>You are good to go!</span>;
    }

    // Renderer callback with condition
    const renderer = ({ seconds, completed, api, props }) => {
      //console.log('api', api);
      //console.log('props', props);
      currentSeconds = seconds;

      console.log('seconds', seconds);
      
      
        console.log('not completed');
        // Render a countdown
        return <div>
        <h2 className='time_to_go_question_time'> ⏱⏲ </h2>
        <h2 className='time_to_go_question'> {seconds} s.  </h2>
        </div>
    };

      return (
        <div>

      

          {question.image ? 
            <img src={question.image} className='question_image' alt='React Logo' /> : null}

            <div>
            <h2 className='question_number' > Pregunta {questionNumber}</h2>
            </div>
            <Countdown
                date={Date.now() + constants.TIME_TO_GO_QUESTIONS}
                renderer={renderer}
                onComplete={(event, api) => console.log('event api', api)}
                key={question.id}
            />

            <h2 className='customDiv'>{question.text}</h2>
            <section>
            <ol>
            {
              question.answers.map((answer, index) => {
                return (
                  <li className='answers' key={index} onClick={() => updateQuestion(question.id, index, currentSeconds)}
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