import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Child } from './components/Child.jsx'
import './App.css'

function App() {


  let positions = Array(10).fill(null);

  const [message, setMessage] = useState('Hello');

  const chooseMessage = (message) => {
    setMessage(message);
  };
  

  return (
    <main className='board'>
        <img src={reactLogo} alt='React Logo' />
        
      <h2 className='title_game'> Penaltis y cuestiones</h2>
        <section className='game'>
            {
              positions.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                  >
                    {index}
                  </Square>
                )
              })
            }
          </section>
          <h1>{message}</h1>
          <Child chooseMessage={chooseMessage} />
    </main>

    


  )
}

export default App
