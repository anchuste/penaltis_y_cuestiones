import { Square } from './Square.jsx'

export const SupportForm = () => {

    /*
    const maxNumber = question.length;
    let indexQuestion = Math.floor(Math.random() * maxNumber);
    let correctAnswer = question[indexQuestion].correctAnswer;
    console.log('indexQuestion: ', indexQuestion);*/

      return (
        <div>
            <h2> ¡Formulario para nuevas preguntas!</h2>
            <form action="">
                <input className='questions_support_form_input_text' type="text" placeholder="Escribe tu nombre" />
                <textarea className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Escribe tu pregunta" />
                <textarea className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 1" />
                <textarea className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 2" />
                <textarea className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 3" />
                <input className='questions_support_form_input_text' type="text" maxLength={1} placeholder="Respuesta verdadera ¿1/2/3?" />
            </form>
        </div>
      )
}