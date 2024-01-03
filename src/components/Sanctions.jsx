import yellowCard from '../assets/yellow-card.png'

export function Sanctions({SanctionsNumber}){

    const sanctions = SanctionsNumber;

    return (
        <>
        {sanctions === 1? 
            <h4 className='border_sanction_player'> *Sanciones del jugador : <img src={yellowCard} style={{width: "60px", height: "30px", verticalAlign: "middle"}}></img> </h4>
            : null}
        
        {sanctions === 2? 
            <h4 className='border_sanction_player'> *Sanciones del jugador : 
            <img src={yellowCard} style={{width: "60px", height: "30px", verticalAlign: "middle"}}></img> 
            <img src={yellowCard} style={{width: "60px", height: "30px", verticalAlign: "middle"}}></img> 
            </h4>
            : null}
        </>
    );
}