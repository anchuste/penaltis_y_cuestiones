import { useState, useRef, useEffect } from 'react'
import { NavBar } from './components/NavBar';
import { Ranking } from './components/Ranking';
import BuyACoffee from './components/BuyACoffee';
import { TestQuestion } from './components/TestQuestion';
import { MultiplayerGame } from './components/MultiplayerGame.jsx';
import { SinglePlayerGame } from './components/SinglePlayerGame.jsx';
import { ShowIconHeader } from './components/ShowIconHeader';
import { SupportForm } from './components/SupportForm';
import { HandleQuestions } from './components/HandleQuestions.jsx';
import { AdministratorMenuLogin } from './components/AdministratorMenuLogin.jsx';


function App() {

  console.log('Se renderiza el componente App');

  //const [numberPlayers, setNumberPlayers] = useState(0);
  const [multiplayer, setMultiplayer] = useState(false);
  const [gameTypeSelected, setGameTypeSelected] = useState(false);
  const [started, setStarted] = useState(false);
  const [navBarstate, setNavBarstate] = useState('homeNavBarButton');
  const unlockTestQuestion = useRef(0);
  const unlockHandleQuestions = useRef(0);

  const multiplayerStartGame = () => {
    setGameTypeSelected(true);
    setMultiplayer(true);
  }

  const singlePlayerStartGame = () => {
    setGameTypeSelected(true);
    setMultiplayer(false);
  }

  const handleNumberPlayers = (numberPlayers) => {
    let numberPlayersSelected = numberPlayers.target.innerHTML;
    /*
    let questions = await getQuestions(numberPlayers);
    console.log('questions', questions);
    let questionsForMultiGame = getQuestionsForMultiplayerGame(questions, PLAYERS_NUMBER_ALLOWED, numberPlayersSelected);
    console.log('questionsForMultiGame', questionsForMultiGame);*/
  };

  const handleNavBarState = (newNavBarState) => {

    //console.log('newNavBarState', newNavBarState);
    //console.log('unlockTestQuestion.current', unlockTestQuestion.current);
    //console.log('unlockHandleQuestions.current', unlockHandleQuestions.current);

    if (newNavBarState === 'supportNavBarButton') {
      unlockHandleQuestions.current += 1;
    }

    if (unlockHandleQuestions.current > 3) {
      unlockHandleQuestions.current = 0;
    }

    if (newNavBarState === 'instructionsNavBarButton') {
      unlockTestQuestion.current += 1;
    }

    if (unlockTestQuestion.current > 2) {
      unlockTestQuestion.current = 0;
    }
    
    setNavBarstate(newNavBarState);
  }

  const startGame = () => {
    setStarted(true);
  }

  return (
    <>    

    {gameTypeSelected === false && started === false ?
    <>
    <NavBar handleNavBarState={handleNavBarState} />
    </>
    : null}

    <main className='board'> 

        <ShowIconHeader started={started} showSummary={false} navBarstate={navBarstate}></ShowIconHeader>

        {navBarstate === 'homeNavBarButton' && gameTypeSelected === false && started === false?
              <>
              <Ranking points={5} title={"Máximas puntuaciones"}></Ranking>
              </>
              :null}

        {started === false &&  navBarstate === 'homeNavBarButton' && multiplayer !== true ?
              <>
              <h2 style={{color: "papayawhip", marginTop: "10%", marginBottom: "5%", color: "#8738f4"}}> Inicia tu partida: </h2>
              <button className='board_button_start' onClick={startGame}> 1 Jugador 🙍🏻‍♂️</button>
              <button className='board_button_start' onClick={multiplayerStartGame}> Varios jugadores 🙍🏻‍♂️🙍🏼‍♀️</button>
              </>
              :null}

        

          {multiplayer === false ?
          <>
          <SinglePlayerGame singlePlayerStartGame={singlePlayerStartGame} multiplayerStartGame={multiplayerStartGame} gameStarted={started}>  </SinglePlayerGame>
          </>
          : null}

          {multiplayer === true ?
          <>
          <MultiplayerGame>  </MultiplayerGame>
          </>
          : null}

          {navBarstate === 'rankingNavBarButton'  ?
            <>
            <Ranking points={10} title={"Clasificación"}></Ranking>
            </>
          :null
          }
            
          {navBarstate === 'buyaCoffeeBarButton' ?
            <>
            <BuyACoffee></BuyACoffee>
            </>
            :null}
    
          {navBarstate === 'instructionsNavBarButton' && unlockTestQuestion.current >= 2 ? 
            <>
            <TestQuestion questionIndex={103} ></TestQuestion>
            </>
            :null}

          {navBarstate === 'supportNavBarButton' && unlockHandleQuestions.current >= 3 ?
            <>
            <AdministratorMenuLogin ></AdministratorMenuLogin>
            </>
            :null}
          
          {navBarstate === 'supportNavBarButton' && unlockHandleQuestions.current < 3 && <SupportForm></SupportForm>}

    </main>
    </>
  )
}

export default App
