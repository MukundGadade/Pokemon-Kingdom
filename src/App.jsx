import { useEffect, useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import { PokemonCharacterDetails } from './components/PokemonCharacterDetails';
import { ShowModalProvider } from './components/CustomProvider/Context/ShowModalProvider';

function App() {

  const [showModal, setShowModal] = useState({show : false, pokemonDetails : {}});

  useEffect(() => {

    if(showModal.show) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }

  }, [showModal.show]);

  return (
    <main>
      <ShowModalProvider value={{showModal, setShowModal}}>
        <MainContainer />
        {showModal.show && (
          <div className='modal-wrapper'>
            <PokemonCharacterDetails />
          </div>
        )}
      </ShowModalProvider>
      <br /><br />
    </main>
  );
}

export default App;
