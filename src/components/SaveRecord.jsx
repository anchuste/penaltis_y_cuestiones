import { Square } from './Square.jsx'
import * as constants from '../constants/index.js'
import { useState } from 'react'
import floppyDisk from '../assets/floppy-disk-64.png'
import {saveGame} from './../services/game-service.js'

export const SaveRecord = (points) => {

    const [errors, setErrors] = useState('');
    const [questionSent, setQuestionSent] = useState(false);
    const [showHint, setShowHint] = useState(true);
    let userAndPoints = "";

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

      console.log('points: ', points)
      // Crear objeto con usuario y puntos para guardar en bbdd
      userAndPoints =  { "user": fields.usuario, "points":points.points}
      try {
        let savedGame = await saveGame(userAndPoints);
        if (savedGame === true){
          setShowHint(false);
          setErrors('');
          setQuestionSent(true);
        }else{
          setErrors('No se ha podido salvar la partida');
        }
      } catch (error) {
        console.error(error);
        setErrors('No se ha podido salvar la partida');
      }
      
      
      //console.log('Se ha enviado el formulario');
    }

      return (
                <>
                {showHint && 

                <form action="" onSubmit={handleSubmmit}>
                <div style={{width:'100%', backgroundColor:'rebeccapurple', display:'flex', borderRadius:'6px'}}>
                    <div>
                        <input style={{width:'90%', display:'table-cell', marginTop:'2px', backgroundColor: 'seashell', color: 'black'}} name='usuario' className='name_player' type="text" placeholder="Introduce tu nombre" />
                    </div>
                    <button  style={{width:'25%'}} type='submit' className='btn_save_disk'> 
                      <img style={{width: "27px", height: "27px", verticalAlign: "middle"}} src={floppyDisk} alt='floppy disk' />
                    </button>
                </div>
                </form>}
                
                
                {showHint && <h4 style={{color: '#c4cd5c'}}> * Pulsa en el disco para guardar tu puntuación</h4>}
                {errors != '' && <h4 style={{color: 'indianred'}}>* {errors }</h4>}
                {questionSent && <h4 style={{color: '#4c93d0'}}> La puntuación de ha sido guardada en el ranking. Muchas gracias.💜💜</h4>}
                </>
      )
}