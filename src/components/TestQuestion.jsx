import { Square } from './Square.jsx'
import Countdown from 'react-countdown';
import * as constants from '../constants/index.js';
import data from '../assets/questions/questions.json';
import { useState, useEffect } from 'react';
import { getQuestions } from '../services/question-service.js';

export const TestQuestion = ({ questionIndex }) => {

    console.log('Se renderiza el componente TestQuestion');

    const [questionToTest, setQuestionToTest] = useState();
    const [questionIndexSelected, setQuestionIndexSelected] = useState();

    if (questionToTest != undefined) {
      questionToTest.answersFormatted = questionToTest.answers.split('**');
    }

    let questions;

    //let questionToTest = questions[questionIndex];

    let currentSeconds = 0;

    useEffect(() => {

      //console.log('Se renderiza el componente TestQuestion useEffect');

      async function fetchQuestionData() {
        const response = await getQuestions();
        questions = response;
        const indexCuestion = questions.findIndex(item => item.id_question === questionIndexSelected);
        let questionToTestAux = questions[indexCuestion];
        setQuestionToTest(questionToTestAux);
      }
  
      fetchQuestionData();
      
    }, [questionIndexSelected]);

    // Renderer callback with condition
    const renderer = ({ seconds, completed, api, props }) => {
      //console.log('api', api);
      //console.log('props', props);
      currentSeconds = seconds;

      // Render a countdown
      return <h2 className='time_to_go_question'> {seconds} s.  </h2>
        
    };

    return (
      <div>
        <div>
        <input id="questionIndexSelected" name='selectedQuestion' onChange={
          (event) => {
            setQuestionIndexSelected(parseInt(event.target.value));
        }}></input>
        </div>

        {questionToTest != undefined && questionToTest.image ? 
          <img src={questionToTest.image} className='question_image' alt='React Logo' /> : null}

          <div>
          <h2 className='question_number' > Pregunta de test</h2>
          </div>
          <div>
          <h2 className='time_to_go_question_time'> ⌚ </h2>

          {questionToTest !=undefined &&
          <Countdown
              date={Date.now() + constants.TIME_TO_GO_QUESTIONS}
              renderer={renderer}
              onComplete={(event, api) => console.log('event api', api)}
              key={questionToTest.id_question}
          />}
          
          </div>

          {questionToTest != undefined ?
          <h2 className='customDiv'>{questionToTest.question}</h2>: null}
          <section>
          <ol>
          {
            questionToTest != undefined && questionToTest.answersFormatted.map((answer, index) => {
              return (
                <li className='answers' key={index} onClick={() => updateQuestion(questionToTest.id, index, currentSeconds)}
                >
                  {answer}
                </li>
              )
            })
          }
          </ol>
          {questionToTest != undefined ?
          <h5 style={{marginTop: "8px"}}>Autor de la pregunta: {questionToTest.author}</h5>:null}
        </section>
      </div>
    )
}