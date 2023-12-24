import { Square } from './Square.jsx'
import * as constants from './../constants/index.js'
import { useState } from 'react'
import { setSaveUserQuestion, getLastIdQuestion } from '../services/question-service.js'

export const SupportForm = () => {

    const [errors, setErrors] = useState('');
    const [questionSent, setQuestionSent] = useState(false);

    const handleSubmmit = async (event) => {
      event.preventDefault();
      const fields = Object.fromEntries(new FormData(event.target));
      console.log(fields);
      setQuestionSent(false);

      if (fields.usuario === '') {
        console.log('Error en el campo usuario');
        setErrors('El nombre no puede estar vacío');
        return;
      }

      if (fields.pregunta === '') {
        console.log('Error en el campo pregunta');
        setErrors('La pregunta no puede estar vacía');
        return;
      }

      if (fields.respuesta1 === '') {
        console.log('Error en el campo respuesta1');
        setErrors('La respuesta 1 no puede estar vacía');
        return;
      }

      if (fields.respuesta2 === '') {
        console.log('Error en el campo respuesta2');
        setErrors('La respuesta 2 no puede estar vacía');
        return;
      }

      if (fields.respuesta3 === '') {
        console.log('Error en el campo respuesta3');
        setErrors('La respuesta 3 no puede estar vacía');
        return;
      }

      if (fields.respuestaCorrecta === '') {
        console.log('Error en el campo respuestaCorrecta');
        setErrors('La respuesta correcta no puede estar vacía');
        return;
      }

      let lastIdQuestion = await getLastIdQuestion();
      lastIdQuestion = lastIdQuestion[0].lastId;

      // Crear objeto para guardar en bbdd
      let questionUser = {
      question: fields.pregunta, 
      answer1: fields.respuesta1, 
      answer2: fields.respuesta2, 
      answer3: fields.respuesta3, 
      correctAnswer: fields.respuestaCorrecta,
      user: fields.usuario,
      validated: 0
      }

      let savedUserQuestion = await setSaveUserQuestion(questionUser);
      if (savedUserQuestion === true){
        setErrors('');
        setQuestionSent(true);
        console.log('Se ha enviado el formulario');
      }
      else{
        setErrors('No se ha podido salvar la pregunta');
        console.log('No se ha podido enviar el formulario');
      }
    }

      return (
        <div style={{width: '22em'}}>
            <h2> {constants.COLABORA_TITULO_PRINCIPAL} </h2>
            <form action="" onSubmit={handleSubmmit}>
                <textarea style={{marginTop: '20px'}} name='usuario' className='questions_support_form_input_text' rows={2} maxLength={15} placeholder="Escribe tu nombre" />
                <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Escribe tu pregunta" />
                <textarea name='respuesta1' className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 1" />
                <textarea name='respuesta2' className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 2" />
                <textarea name='respuesta3' className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 3" />
                <textarea name='respuestaCorrecta' className='questions_support_form_text_area' rows={2} maxLength={15} placeholder="Respuesta verdadera ¿1/2/3?" />

                {errors != '' && <h3 style={{color: '#e24444'}}> ❌ {errors } </h3>}
                {questionSent && <h3 style={{color: '#4c93d0'}}> Pregunta enviada. ¡Muchas gracias! ⭐</h3>}
                <button className='questions_support_form_button' type="submit">Enviar</button>
            </form>
        </div>
      )
}