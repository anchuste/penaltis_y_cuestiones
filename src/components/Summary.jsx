import { useEffect, useState } from 'react'
import yellowCard from '../assets/yellow-card.png'
import redCard from '../assets/red-card.png'
import { SaveRecord } from './SaveRecord';

export const Summary = ({ answers, totalQuestionsNumber, points, resetGame }) => {

    //console.log('Se renderiza el componente Summary');
    //console.log('answers', answers);

    const correctAnswers = answers.filter(answer => answer === 'correct').length;
    const incorrectAnswers = answers.filter(answer => answer === 'incorrect').length;
    const rightPorcentage = (correctAnswers / totalQuestionsNumber) * 100;

    let title = '';
    let fraseEncabezado = '';
    let entrenador = '';
    let imagenEntrenador = '';

    if (rightPorcentage === 100) {
        fraseEncabezado = '¡Eres un auténtico míster! ';
        entrenador = 'Pep Guardiola';
        imagenEntrenador = 'https://mediacdn.mancity.com/-/media/images/home/news/team-news/2015-16-season/july/pep12.ashx?width=1136';
    }else if (rightPorcentage >= 90 && rightPorcentage < 100) {
        fraseEncabezado = '¡Estás cerca de convertirte en el mejor! De momento tienes que conformarte con ser el segundo entrenador de un gran club. 🥈';
        entrenador = 'José Mourinho';
        imagenEntrenador = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Mourinho_Madrid.jpg/273px-Mourinho_Madrid.jpg';
    }else if (rightPorcentage >= 70 && rightPorcentage < 90) {
        fraseEncabezado = '¡Te falta poco para llegar a ser un súper entrenador! Sigue practicando.';
        entrenador = 'Fabio Capello';
        imagenEntrenador = 'https://upload.wikimedia.org/wikipedia/commons/7/79/Russia-Aizer_%284%29.jpg';
    }else if (rightPorcentage >= 50 && rightPorcentage < 70) {
        fraseEncabezado = 'Si sigues así, en breve serás un entrenador de élite.';
        entrenador = 'Marcelo Bielsa';
        imagenEntrenador = 'https://cflvdg.avoz.es/sc/mkTkEUnog4iJl6CJhYLShvYscmI=/768x/2016/07/08/00121467978603783815804/Foto/afp_20160708_094658720.jpg';
    }else if (rightPorcentage >= 30 && rightPorcentage < 50) {
        fraseEncabezado = 'Necesitas más rodaje de partidos. ¡Sigue practicando!';
        entrenador = 'Fernando Vázquez';
        imagenEntrenador = 'https://www.grupotortuga.com/wp-content/uploads/2014/03/sin-tc3adtulo.png';
    }else if (rightPorcentage >= 15 && rightPorcentage < 50) {
        fraseEncabezado = 'El fútbol no es lo tuyo. Dedícate a otra cosa. 🤦‍♂️';
        entrenador = 'Miguel Ángel Lotina';
        imagenEntrenador = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Miguel_%C3%81ngel_Lotina.jpg';
    }
    else if (rightPorcentage < 15) {
        fraseEncabezado = 'El fútbol no es lo tuyo. Dedícate a otra cosa. 🤦‍♂️';
        entrenador = 'Javier Clemente';
        imagenEntrenador = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/JaviClemente.jpg';
    }

    if (rightPorcentage === 100) {
        title = 'PARTIDA FINALIZADA. ¡¡¡TE HAS PASADO EL JUEGO!!! 🏆🏆🏆';
    }

    if (incorrectAnswers > 2) {
        title = 'PARTIDA FINALIZADA';
    }
        
    return (
        <div className='summary'>
        {(
            <div>

            {incorrectAnswers === 1 ? 
            <>
            <h1 style={{marginBottom: "5%", marginTop: "5%"}}>
                {title}  
            </h1>
            <h2 style={{marginBottom: "10px", color: "red"}}>¡HAS TENIDO 1 SANCIÓN!</h2>
            <h2 style={{marginBottom: "30px"}}>
            <img src={yellowCard} style={{width: "70px", height: "40px", verticalAlign: "middle"}}></img> 
            </h2>
            </>
                
             :null}
            
            {incorrectAnswers === 2 ? 
            <>
            <h1 style={{marginBottom: "5%", marginTop: "5%"}}>
                {title}  
            </h1>
            <h2 style={{marginBottom: "10px", color: "red"}}>¡HAS TENIDO 2 SANCIONES!</h2>
            <h2 style={{marginBottom: "30px"}}>
            <img src={yellowCard} style={{width: "70px", height: "40px", verticalAlign: "middle"}}></img> 
            <img src={yellowCard} style={{width: "70px", height: "40px", verticalAlign: "middle"}}></img> 
            </h2>
            </>
             :null}
            
            {incorrectAnswers > 2 ? 
            <>
            <h1 style={{marginBottom: "5%", marginTop: "5%"}}>
                {title}  
            </h1>
            <h2 style={{marginBottom: "10px", color: "red"}}>¡HAS SIDO EXPULSADO!</h2>
            <h2 style={{marginBottom: "30px"}}>
            <img src={yellowCard} style={{width: "70px", height: "40px", verticalAlign: "middle"}}></img> 
            <img src={yellowCard} style={{width: "70px", height: "40px", verticalAlign: "middle"}}></img> 
            <img src={redCard} style={{width: "70px", height: "40px", verticalAlign: "middle"}}></img> 
            </h2>
            </>
             :null}
            
            <h2 className="border_trivial">Respuestas acertadas ✅: {correctAnswers}</h2>
            <h2 className="border_trivial">Respuestas falladas ❌: {incorrectAnswers}</h2>
            <h2 className="border_trivial"> Juego completado al 🎮: {rightPorcentage.toFixed()} % </h2>

            

            <>
            <h3 style={{marginTop:'10px'}}>Tus conocimientos futbolísticos son equiparables a: ¡{entrenador}!</h3>
            <h3></h3>
            <img style={{width: "290px", height: "190px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}}
            src={imagenEntrenador}></img>
            </>
            
            <SaveRecord points={correctAnswers} resetGame={resetGame}></SaveRecord>

            
            

            </div>
        )}
        </div>
    );

}