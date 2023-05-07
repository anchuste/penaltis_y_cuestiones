import { Square } from './Square.jsx'
import Countdown from 'react-countdown';

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
      
      if (completed) {
        console.log('completed');
        // Render a completed state
        //api.start();
        //api.stop();
        return <Completionist/>;
      } else {
        console.log('not completed');
        // Render a countdown
        return <span>{seconds} s.</span>;
      }
    };

      return (
        <div>

      

          {question.image ? 
            <img src={question.image} className='question_image' alt='React Logo' /> : null}

            <h2 className='question_number' > Pregunta número: {questionNumber}</h2>

            <h2>
            <Countdown
                date={Date.now() + 10000}
                //renderer={renderer}
                onComplete={(event, api) => console.log('event api', api)}
                key={question.id}
            />
            </h2>

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