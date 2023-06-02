import { Square } from './Square.jsx'
import * as constants from '../constants/index.js'
import { useState } from 'react'
import floppyDisk from '../assets/floppy-disk-64.png'

export const SaveRecord = () => {

    const [errors, setErrors] = useState('');
    const [questionSent, setQuestionSent] = useState(false);
    const [showHint, setShowHint] = useState(true);

    const handleSubmmit = (event) => {
      event.preventDefault();
      const fields = Object.fromEntries(new FormData(event.target));
      console.log(fields);
      setQuestionSent(false);
      setShowHint(false);

      if (fields.usuario === '') {
        console.log('Error en el campo usuario');
        setErrors('El nombre no puede estar vacío');
        return;
      }

      setErrors('');
      setQuestionSent(true);
      console.log('Se ha enviado el formulario');
    }

      return (
            <form action="" onSubmit={handleSubmmit}>
                {showHint && <div style={{backgroundColor: 'rebeccapurple', borderRadius:'6px', height:'85px'}}>
                  <input style={{marginTop: '20px'}}name='usuario' className='name_player' type="text" placeholder="Introduce tu nombre" />
                  <button className='btn_save_disk' type="submit">
                    <img style={{width: "38px", height: "38px", verticalAlign: "middle"}} src={floppyDisk} alt='floppy disk' />
                  </button>
                </div>}
                {showHint && <h4 style={{color: '#c4cd5c'}}> * Pulsa en el disco para guardar tu puntuación</h4>}
                {errors != '' && <h4 style={{color: 'indianred'}}>* {errors }</h4>}
                {questionSent && <h4 style={{color: '#4c93d0'}}> La puntuación ha sido guardada en el ranking. Muchas gracias.💜💜</h4>}
            </form>
      )
}