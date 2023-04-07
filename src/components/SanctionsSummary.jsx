import yellowCard from '../assets/yellow-card.png'
import redCard from '../assets/red-card.png'

export function SanctionsSummary({SanctionsNumber}){

    const sanctions = SanctionsNumber;
    console.log('sanctions: ', sanctions);

    return (
        <div>
            <h2 style={{marginBottom: "5%", marginTop: "5%"}}>¡TARJETA AMARILLA!</h2>
            <img src={yellowCard} style={{width: "280px", height: "180px"}}></img>
            <h3 style={{marginTop: "5%"}}>Has fallado la pregunta</h3>
            <h3 style={{marginTop: "5%"}}>¡A la próxima te vas a la calle!</h3>
        </div>
    );
}