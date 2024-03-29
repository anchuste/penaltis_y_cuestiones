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
        setNavBarstate(newNavBarState);    
    }
      
    return (
        <>
        <div style={{width: '22em'}}>
            <main className='board'>
                <h2 style={{marginTop: "1.6em"}} className="title">🚧 No disponible 🚧 </h2>
                <h2 style={{marginTop: "1.6em"}} className="title">Estamos trabajando en esta opción de juego 🛠️</h2>
                <h2 style={{marginTop: "1.6em"}} className="title">Estará disponible pronto.</h2>
            </main>
        </div>    
        </>
    )
}