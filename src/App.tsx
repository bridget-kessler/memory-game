import Game from "./components/Game/Game";
import { GameContext, GameContextProvider } from "./contexts/gameContext";
import { LevelContextProvider } from "./contexts/levelContext";
import { ArtContextProvider } from "./contexts/artContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMsg from "./components/layout/ErrorMsg";
import { useContext } from "react";

function App() {
  const { transitionGame } = useContext(GameContext);

  return (
      <GameContextProvider>
    <ErrorBoundary fallbackRender={ErrorMsg} >
        <LevelContextProvider>
          <ArtContextProvider>
            <Game />
          </ArtContextProvider>
        </LevelContextProvider>
    </ErrorBoundary>
      </GameContextProvider>
  );
}

export default App;
