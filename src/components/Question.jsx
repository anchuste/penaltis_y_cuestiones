import { Square } from './Square.jsx'

export const Question = ({ question, answer, index, updateQuestion }) => {

    /*
    const maxNumber = question.length;
    let indexQuestion = Math.floor(Math.random() * maxNumber);
    let correctAnswer = question[indexQuestion].correctAnswer;
    console.log('indexQuestion: ', indexQuestion);*/

      return (
        <div>
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
            
          </section>
        </div>
      )
}