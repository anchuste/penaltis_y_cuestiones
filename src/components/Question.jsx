import { Square } from './Square.jsx'

export const Question = ({ question, questionNumber, index, updateQuestion }) => {

    /*
    const maxNumber = question.length;
    let indexQuestion = Math.floor(Math.random() * maxNumber);
    let correctAnswer = question[indexQuestion].correctAnswer;
    console.log('indexQuestion: ', indexQuestion);*/

      return (
        <div>

          {question.image ? 
            <img src={question.image} className='question_image' alt='React Logo' /> : null}

            <h2 className='question_number' > Pregunta número: {questionNumber}</h2>

            <h2 className='customDiv'>{question.text}</h2>
            <section>
            <ol>
            {
              question.answers.map((answer, index) => {
                return (
                  <li className='answers' key={index} onClick={() => updateQuestion(question.id, index)}
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