import { Square } from './Square.jsx'

export const Question = ({ question, answer, index, updateQuestion }) => {

    const maxNumber = question.length;
    let indexQuestion = Math.floor(Math.random() * maxNumber);
    let correctAnswer = question[indexQuestion].correctAnswer;
    console.log('indexQuestion: ', indexQuestion);

      return (
        <div>
            <h2>{question[indexQuestion].text}</h2>
            <section>
            <ol>
            {
              question[indexQuestion].answers.map((answer, index) => {
                return (
                  <li className='answers' key={index} onClick={() => updateQuestion(index, correctAnswer)}
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