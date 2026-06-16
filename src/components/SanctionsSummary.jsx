import yellowCard from '../assets/yellow-card.png'
import redCard from '../assets/red-card.png'
import incorrectAnswerImage from '../assets/pregunta_fallada.png'

export function SanctionsSummary({SanctionsNumber, Lives}){

    

    var currentLives = 0;

    for (var i = 0; i < Lives.length; i++) { 
        if (Lives[i] == true){
            currentLives = currentLives + 1;
        }
    }

    console.log("Sanctions summary - currentLives: " + currentLives);

    

    const sanctions = SanctionsNumber;

    return (
        <>
            {sanctions === 1?
            <>
            <h2 style={{marginBottom: "5%", marginTop: "5%"}}>¡HAS FALLADO LA PREGUNTA!</h2>
            <img src={incorrectAnswerImage} style={{width: "280px", height: "180px"}}></img>
            <h3 style={{marginTop: "5%"}}>¡Te quedan {currentLives} vidas!</h3>
            </>
            :null}

            {sanctions === 2?
            <>
            <h2 style={{marginBottom: "5%", marginTop: "5%"}}>¡SEGUNDA PREGUNTA FALLADA!</h2>
            <img src={incorrectAnswerImage} style={{width: "280px", height: "180px"}}></img>
            <h3 style={{marginTop: "5%"}}>¡Te queda {currentLives} vida!</h3>
            <h3 style={{marginTop: "5%"}}>¡Si fallas otra más, la partida se acaba!</h3>
            </>
            :null}
        </>
    );
}