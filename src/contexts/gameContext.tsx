import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { tBestTimes, tLevelsKey } from "../types/types";

type Props = {
  children: ReactNode;
};

type GameContextType = {
  gameStatus: string;
  transitionGame: (newStatus: "start" | "loading" | "active" | "over") => void;
  setBestTime: Dispatch<
    SetStateAction<{
      [key in tLevelsKey]: number;
    }>
  >;
  bestTime: {
    [key in tLevelsKey]: number;
  };
};

export const GameContext = createContext<GameContextType>(
  {} as GameContextType
);

export const GameContextProvider = ({ children }: Props) => {
  const [gameStatus, setGameStatus] = useState<
    "start" | "loading" | "active" | "over"
  >("start");
  const [bestTime, setBestTime] = useState<tBestTimes>({
    easy: Infinity,
    medium: Infinity,
    hard: Infinity,
  });

  const transitionGame = (
    newStatus: "start" | "loading" | "active" | "over"
  ) => {
    setTimeout(() => {
      setGameStatus(newStatus);
    }, 1000);
  };

  return (
    <GameContext.Provider
      value={{ gameStatus, transitionGame, bestTime, setBestTime }}
    >
      {children}
    </GameContext.Provider>
  );
};
