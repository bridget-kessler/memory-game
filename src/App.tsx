import Game from './components/Game/Game';
import { GameContextProvider } from './contexts/gameContext';
import { LevelContextProvider } from './contexts/levelContext';
import { ArtContextProvider } from './contexts/artContext';

function App() {

  return (
    <GameContextProvider>
      <LevelContextProvider>
        <ArtContextProvider>
          <Game />
        </ArtContextProvider>
      </LevelContextProvider>
    </GameContextProvider>
  )
}

export default App
