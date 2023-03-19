import { Square } from './Square.jsx'

export const Question = ({ question, answer, index, updateQuestion }) => {

    /*
    const maxNumber = question.length;
    let indexQuestion = Math.floor(Math.random() * maxNumber);
    let correctAnswer = question[indexQuestion].correctAnswer;
    console.log('indexQuestion: ', indexQuestion);*/

      return (
        <div>

          {question.image ? 
            <img src={question.image} style={{width: "320px", height: "220px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}} alt='React Logo' /> : null}
          
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