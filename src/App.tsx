import Game from "./components/Game/Game";
import { GameContextProvider } from "./contexts/GameContext";
import { LevelContextProvider } from "./contexts/LevelContext";
import { ArtContextProvider } from "./contexts/ArtContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMsg from "./components/layout/ErrorMsg";

function App() {

  return (
    <ErrorBoundary fallbackRender={ErrorMsg}>
      <GameContextProvider>
        <LevelContextProvider>
          <ArtContextProvider>
            <Game />
          </ArtContextProvider>
        </LevelContextProvider>
      </GameContextProvider>
    </ErrorBoundary>
  );
}

export default App;
