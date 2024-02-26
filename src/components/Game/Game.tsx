import { FC } from "react";
import StartGame from "../StartGame";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import SlideIn from "../layout/SlideIn";
import GameBoard from "../Gameboard";
import GameOver from "../GameOver";
import AriaLiveRegion from "../layout/AriaLiveRegion";
import { tGameStatus } from "../../types/types";

const Game = () => {
  const { gameStatus } = useContext(GameContext);

  const game: {
    [key in tGameStatus]: { ariaMessage?: string; component: FC<any> };
  } = {
    loading: {
      ariaMessage: "Game is loading. Please wait.",
      component: LoadingScreen,
    },
    active: {
      ariaMessage: "Game started",
      component: GameBoard,
    },
    over: {
      ariaMessage: "Game over",
      component: GameOver,
    },
    start: {
      ariaMessage: "",
      component: StartGame,
    },
  };

  const { ariaMessage = "", component: GameScreen } = game[gameStatus];

  return (
    <main className="min-h-dvh grid overflow-clip">
      <AriaLiveRegion>
        <p>{ariaMessage}</p>
      </AriaLiveRegion>
      <SlideIn>
        <GameScreen />
      </SlideIn>
    </main>
  );
};

export default Game;
