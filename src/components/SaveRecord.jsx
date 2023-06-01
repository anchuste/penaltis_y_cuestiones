import { Square } from './Square.jsx'
import * as constants from '../constants/index.js'
import { useState } from 'react'
import floppyDisk from '../assets/floppy-disk-64.png'

export const SaveRecord = () => {

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
            <form action="" onSubmit={handleSubmmit}>
                <div>
                <input style={{marginTop: '20px'}}name='usuario' className='name_player' type="text" placeholder="Introduce tus iniciales" />
                <button className='btn_save_disk' type="submit">
                  <img style={{width: "38px", height: "38px", verticalAlign: "middle"}} src={floppyDisk} alt='floppy disk' />
                </button>
                </div>

                

                {errors != '' && <h3 style={{color: 'indianred'}}> {errors }</h3>}
                {questionSent && <h3 style={{color: '#4c93d0'}}> Pregunta enviada. ¡Muchas gracias! ⭐</h3>}
                
            </form>
        </div>
      )
}