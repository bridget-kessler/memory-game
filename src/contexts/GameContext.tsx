import { ReactNode, createContext, useContext, useState } from "react";
import { tGameStatus } from "../types/types";

type Props = {
  children: ReactNode;
};

type GameContextType = {
  gameStatus: tGameStatus;
  transitionGame: (newStatus: tGameStatus) => void;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

const GameContextProvider = ({ children }: Props) => {
  const [gameStatus, setGameStatus] = useState<tGameStatus>("start");

  const transitionGame = (
    newStatus: tGameStatus
  ) => {
    setTimeout(() => {
      setGameStatus(newStatus);
    }, 1000);
  };

  return (
    <GameContext.Provider
      value={{
        gameStatus,
        transitionGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};

export { GameContextProvider, useGameContext, GameContext };
