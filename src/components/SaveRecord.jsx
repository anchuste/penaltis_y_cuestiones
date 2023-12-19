import { Square } from './Square.jsx'
import * as constants from '../constants/index.js'
import { useState } from 'react'
import floppyDisk from '../assets/floppy-disk-64.png'
import {saveGame} from './../services/game-service.js'
import DotLoader from "react-spinners/DotLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const SaveRecord = ({points, resetGame}) => {

  const CSSProperties = {
      display: "block",
      margin: "0 auto",
      marginTop: "1em",
      borderColor: "red",
      title: 'Guardando puntuación...'
    };

    const [errors, setErrors] = useState('');
    const [questionSent, setQuestionSent] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [showLoading, setshowLoading] = useState(false);
    let userAndPoints = "";

    const handleSubmmit = async (event) => {
      event.preventDefault();
      const fields = Object.fromEntries(new FormData(event.target));
      setQuestionSent(false);
      

      if (fields.usuario === '') {
        setErrors('El nombre no puede estar vacío');
        return;
      }

      // Crear objeto con usuario y puntos para guardar en bbdd
      userAndPoints =  { "user": fields.usuario, "points":points}
      try {
        setshowLoading(true);
        let savedGame = await saveGame(userAndPoints);
        if (savedGame === true){
          setShowHint(false);
          setErrors('');
          setQuestionSent(true);

          toast.success('¡Puntuación de ' + fields.usuario +  ' guardada!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => {resetGame()}
          });
          
        }else{
          setErrors('No se ha podido salvar la partida');
        }
      } catch (error) {
        console.error(error);
        setErrors('No se ha podido salvar la partida');
      } finally {
        setshowLoading(false);
      }      
    }

      return (
                <>
                {showHint && 

                <form action="" onSubmit={handleSubmmit}>
                <div style={{width:'100%', backgroundColor:'rebeccapurple', display:'flex', borderRadius:'6px'}}>
                        <input style={{width:'100%', display:'table-cell', backgroundColor: 'seashell', color: 'black'}} name='usuario' className='name_player' type="text" placeholder="Introduce tu nombre" />
                        
                </div>
                <DotLoader
                color={"papayawhip"}
                loading={showLoading}
                size={35}
                cssOverride={CSSProperties}
                aria-label="Loading Spinner"
                data-testid="loader"
                title='Guardando puntuación...'
                />
                {errors != '' && <h4 style={{color: 'indianred'}}>* {errors }</h4>}
                <button className='btn'>¡Guardar puntuación y comenzar otra partida!</button>
                </form>}
                <ToastContainer/>
                </>
      )
}