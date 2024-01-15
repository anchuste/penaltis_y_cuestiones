import React, { useEffect, useState } from "react";
import {getQuestions} from '../services/question-service.js'
import {getQuestionsForMultiplayerGame} from '../common-functions/common-functions.js'
import { PLAYERS_NUMBER_ALLOWED } from '../constants/index.js';
import { NavBar } from './NavBar';
import { Ranking } from './Ranking';
import BuyACoffee from './BuyACoffee';

export function MultiplayerGame() {

    const [started, setStarted] = useState(false);
    const [navBarstate, setNavBarstate] = useState('homeNavBarButton');

    //const [numberPlayers, setNumberPlayersState] = useState(1);
    //const [showButton, setShowButton] = useState(false);

    const handleNavBarState = (newNavBarState) => {

        if (newNavBarState === 'instructionsNavBarButton') {
        unlockTestQuestion.current = unlockTestQuestion.current + 1;
        }

        setNavBarstate(newNavBarState);

        if (newNavBarState === 'instructionsNavBarButton' && unlockTestQuestion.current >= 6) {
        unlockTestQuestion.current = 0;
        }
    }
      
    return (
        <>    
        
        <main className='board'>
        <>
        <h2 style={{marginTop: "1.6em"}} className="title">Cargando partida múltiple para jugadores...</h2>
        </>

        </main>

        </>

    )
}