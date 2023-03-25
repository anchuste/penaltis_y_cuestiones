import { useEffect, useState } from 'react'

export const Summary = ({ answers }) => {
    console.log('Se renderiza el componente Summary');

    const correctAnswers = answers.filter(answer => answer === 'correct').length;
    const incorrectAnswers = answers.filter(answer => answer === 'incorrect').length;
    const rightPorcentage = (correctAnswers / answers.length) * 100;

    
    return (
        <div className='summary'>
        {(
            <div>
           
            {rightPorcentage >= 70 ? 
            <>
            <h3 style={{marginBottom: "5%"}}>¡Eres un auténtico míster! 🏆🏆🏆 </h3>
            <h3>⚽Tus conocimientos futbolísticos se asemejan a los de Pep Guardiola.⚽</h3>
            <img style={{width: "320px", height: "220px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}}
            src='https://upload.wikimedia.org/wikipedia/commons/b/be/Pep_2017_%28cropped%29.jpg'></img>
            </>
            :
            null}

            
            {rightPorcentage >= 50 && rightPorcentage < 70 ?
            <>
            <h3 style={{marginBottom: "5%"}}>¡Te falta poco para llegar a ser un súper entrenador! Sigue practicando. </h3>
            <h3>⚽Tus conocimientos futbolísticos se asemejan a los de Fabio Capello.⚽</h3>
            <img style={{width: "320px", height: "220px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}}
            src='https://upload.wikimedia.org/wikipedia/commons/7/79/Russia-Aizer_%284%29.jpg'></img>
            </>
            :
            null}

            {rightPorcentage >= 30 && rightPorcentage < 50 ?
            <>
            <h3 style={{marginBottom: "5%"}}>Necesitas más rodaje de partidos. ¡Sigue practicando!</h3>
            <h3>⚽Tus conocimientos futbolísticos se asemejan a los de Fernando Vázquez.⚽</h3>
            
            <img style={{width: "320px", height: "220px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}}
            src='https://upload.wikimedia.org/wikipedia/commons/3/3f/FERNANDO_VAZQUEZ_PENA.png'></img>
            </>
            :
            null}

            {rightPorcentage < 30 ?
            <>
            <h3 style={{marginBottom: "5%"}}>El fútbol no es lo tuyo. Dedícate a otra cosa. 🤦‍♂️🤦‍♂️🤦‍♂️</h3>
            <h3>⚽ Tus conocimientos futbolísticos se asemejan a los de Miguel Ángel Lotina. ⚽</h3>
            <img style={{width: "320px", height: "220px", marginTop:"10px", borderStyle: "solid", borderRadius: "10%", borderColor: "black"}}
            src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Miguel_%C3%81ngel_Lotina.jpg'></img>
            </>
            :
            null}

            <h2 style={{marginBottom: "5%"}}>Resumen de la partida</h2>
            <h3>Porcentaje de aciertos ✅: {rightPorcentage.toFixed()} % </h3>
            <h3>Respuestas correctas ✅: {correctAnswers}</h3>
            <h3>Respuestas incorrectas ❌: {incorrectAnswers}</h3>
            

            </div>
        )}
        </div>
    );

}