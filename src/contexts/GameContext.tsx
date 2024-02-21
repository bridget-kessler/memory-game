import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type GameContextType = {
  gameStatus: string;
  transitionGame: (newStatus: "start" | "loading" | "active" | "over") => void;
};

const GameContext = createContext<GameContextType>(
  {} as GameContextType
);

const GameContextProvider = ({ children }: Props) => {
  const [gameStatus, setGameStatus] = useState<
    "start" | "loading" | "active" | "over"
  >("start");

  const transitionGame = (
    newStatus: "start" | "loading" | "active" | "over"
  ) => {
    setTimeout(() => {
      setGameStatus(newStatus);
    }, 1000);
  };


  return (
    <GameContext.Provider
      value={{
        gameStatus,
        transitionGame
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