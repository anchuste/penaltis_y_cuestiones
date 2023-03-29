import { useEffect, useState } from 'react'

export const Summary = ({ answers, totalQuestionsNumber }) => {
    console.log('Se renderiza el componente Summary');

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
        imagenEntrenador = 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pep_2017_%28cropped%29.jpg';
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
        imagenEntrenador = 'https://cope-cdnmed.agilecontent.com/resources/jpg/5/6/1577718797065.jpg';
    }else if (rightPorcentage < 30) {
        fraseEncabezado = 'El fútbol no es lo tuyo. Dedícate a otra cosa. 🤦‍♂️';
        entrenador = 'Miguel Ángel Lotina';
        imagenEntrenador = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Miguel_%C3%81ngel_Lotina.jpg';
    }

    if (rightPorcentage === 100) {
        title = 'PARTIDA FINALIZADA. ¡¡¡TE HAS PASADO EL JUEGO!!! 🏆🏆🏆';
    }

    if (incorrectAnswers > 0) {
        title = 'PARTIDA FINALIZADA. HAS FALLADO ❌❌❌';
    }
        
    return (
        <div className='summary'>
        {(
            <div>
            
            <h2 style={{marginBottom: "5%", marginTop: "5%"}}>{title}</h2>
            
            <>
            <h3 style={{marginBottom: "5%"}}> {fraseEncabezado} </h3>
            <h3>⚽Tus conocimientos futbolísticos se asemejan a los de {entrenador}⚽</h3>
            <img style={{width: "320px", height: "220px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}}
            src={imagenEntrenador}></img>
            </>

            <h2 style={{marginBottom: "5%"}}>ESTADÍSTICAS</h2>
            <h3>Respuestas correctas ✅: {correctAnswers}</h3>
            <h3>Juego completado 🎮: {rightPorcentage.toFixed()} % </h3>

            </div>
        )}
        </div>
    );

}