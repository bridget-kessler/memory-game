import { ReactNode, useState } from "react";
import StartGame from "../StartGame";
import { useContext } from "react";
import { GameContext } from "../../contexts/gameContext";
import LoadingScreen from "../LoadingScreen";
import SlideIn from "../layout/SlideIn";
import GameBoard from "../Gameboard";
import GameOver from "../GameOver";
import AriaLiveRegion from "../layout/AriaLiveRegion";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMsg from "../layout/ErrorMsg";

const Game = () => {
  const { gameStatus } = useContext(GameContext);
  const [ariaMessage, setAriaMessage] = useState("");

  const message = () => {
    switch (gameStatus) {
      case "loading":
        return <>Game is loading</>;
      case "active":
        return <>Game started</>;
      case "over":
        return <>Gameover</>;
      default:
        return "Game start";
    }
  };

  const gameScreen = (): ReactNode => {
    switch (gameStatus) {
      case "loading":
        setAriaMessage("Game loading. Please wait.");
        return (
          <SlideIn>
            <LoadingScreen />
          </SlideIn>
        );
      case "active":
        setAriaMessage("Game started");
        return (
          <SlideIn>
            <GameBoard />
          </SlideIn>
        );
      case "over":
        setAriaMessage("Game over");
        return (
          <SlideIn>
            <GameOver />
          </SlideIn>
        );
      default:
        setAriaMessage("");
        return (
          <SlideIn>
            <StartGame />
          </SlideIn>
        );
    }
  };

  return (
    <ErrorBoundary fallbackRender={ErrorMsg}>
      <main className="min-h-screen grid overflow-clip">
        <AriaLiveRegion>{ariaMessage}</AriaLiveRegion>
        {gameScreen()}
      </main>
    </ErrorBoundary>
  );
};

export default Game;
