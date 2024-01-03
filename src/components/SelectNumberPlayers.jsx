import React, { useState } from "react";

export function SelectNumberPlayers({numberPlayersAllowed}) {

    const [numberPlayers, setNumberPlayersState] = useState(1);
    const [showButton, setShowButton] = useState(false);
    
    const handleNumberPlayers = (e) => {
        setNumberPlayersState(e.target.value);
        setShowButton(true);
    };
    
    return (
        <>
        <h2 style={{marginBottom: "0.6em"}} className="title">Selecciona el número de jugadores</h2>
        <div className="select_number_players">
            {
                Array.from({ length: numberPlayersAllowed }).map((_, i) => {
                    return (
                        <button  key={i}> {i+1}</button>
                    );
                })
            }
        </div>        
        </>)
}