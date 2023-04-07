import yellowCard from '../assets/yellow-card.png'
import redCard from '../assets/red-card.png'

export function Sanctions({SanctionsNumber}){

    const sanctions = SanctionsNumber;
    console.log('sanctions: ', sanctions);

    return (
        <>
        {sanctions > 0? 
            <h4 style={{color: "black", backgroundColor: "#00b4d8", marginTop: "3px"}}> *Sanciones del jugador : <img src={yellowCard} style={{width: "60px", height: "30px", verticalAlign: "middle"}}></img> </h4>
            : null}
        </>
    );
}