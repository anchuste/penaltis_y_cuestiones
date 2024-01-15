import React, { useState } from "react";
import {getQuestions} from '../services/question-service.js'
import {getQuestionsForMultiplayerGame} from '../common-functions/common-functions.js'
import { PLAYERS_NUMBER_ALLOWED } from '../constants/index.js';

export function SelectNumberPlayers({numberPlayersAllowed, handleNumberPlayers}) {

    const [numberPlayers, setNumberPlayersState] = useState(1);
    const [showButton, setShowButton] = useState(false);
      
    return (
        <>
        <h2 style={{marginBottom: "0.6em"}} className="title">Selecciona el número de jugadores</h2>
        <div className="select_number_players">
            {
                Array.from({ length: numberPlayersAllowed }).map((_, i) => {
                    return (
                        <button  key={i+1} onClick={handleNumberPlayers}> {i+1}</button>
                    );
                })
            }
        </div>        
        </>)
}