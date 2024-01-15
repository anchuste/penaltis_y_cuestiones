import { useState, useRef, useEffect } from 'react'
import { NavBar } from './components/NavBar';
import { Ranking } from './components/Ranking';
import BuyACoffee from './components/BuyACoffee';
import { TestQuestion } from './components/TestQuestion';
import { MultiplayerGame } from './components/MultiplayerGame.jsx';
import { SinglePlayerGame } from './components/SinglePlayerGame.jsx';
import { ShowIconHeader } from './components/ShowIconHeader';
import { SupportForm } from './components/SupportForm';



function App() {

  console.log('Se renderiza el componente App');

  //const [numberPlayers, setNumberPlayers] = useState(0);
  const [multiplayer, setMultiplayer] = useState(false);
  const [gameTypeSelected, setGameTypeSelected] = useState(false);

  const [navBarstate, setNavBarstate] = useState('homeNavBarButton');

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
    setNavBarstate(newNavBarState);
  }

  return (
    <>    

    {gameTypeSelected === false ? 
    <>
    <NavBar handleNavBarState={handleNavBarState} />
    </>
    : null}

    <main className='board'> 

        <ShowIconHeader started={gameTypeSelected} showSummary={false} navBarstate={navBarstate}></ShowIconHeader>

        {navBarstate === 'homeNavBarButton' && gameTypeSelected === false?
              <>
              <Ranking points={5} title={"TOP 5"}></Ranking>
              </>
              :null}

          {multiplayer === false ?
          <>
          <SinglePlayerGame singlePlayerStartGame={singlePlayerStartGame} multiplayerStartGame={multiplayerStartGame}>  </SinglePlayerGame>
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
            <TestQuestion questionIndex={101} ></TestQuestion>
            </>
            :null}
          
          {navBarstate === 'supportNavBarButton' && <SupportForm></SupportForm>}

    </main>
    </>
  )
}

export default App
