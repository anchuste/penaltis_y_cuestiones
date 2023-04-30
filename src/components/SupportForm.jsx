import { Square } from './Square.jsx'
import * as constants from './../constants/index.js'
import { useState } from 'react'

export const SupportForm = () => {

    const [errors, setErrors] = useState('');
    const [questionSent, setQuestionSent] = useState(false);

    const handleSubmmit = (event) => {
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

      setErrors('');
      setQuestionSent(true);
      console.log('Se ha enviado el formulario');
    }

      return (
        <div>
            <h2> {constants.COLABORA_TITULO_PRINCIPAL} </h2>
            <form action="" onSubmit={handleSubmmit}>
                <input name='usuario' className='questions_support_form_input_text' type="text" placeholder="Escribe tu nombre" />
                <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Escribe tu pregunta" />
                <textarea name='respuesta1' className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 1" />
                <textarea name='respuesta2' className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 2" />
                <textarea name='respuesta3' className='questions_support_form_text_area' rows={2} maxLength={30} placeholder="Escribe la respuesta 3" />
                <input name='respuestaCorrecta' className='questions_support_form_input_text' type="text" maxLength={1} placeholder="Respuesta verdadera ¿1/2/3?" />

                {errors != '' && <h3 style={{color: 'indianred'}}> {errors }</h3>}
                {questionSent && <h3 style={{color: '#4c93d0'}}> Pregunta enviada. ¡Muchas gracias! ⭐</h3>}
                <button className='questions_support_form_button' type="submit">Enviar</button>
            </form>
        </div>
      )
}