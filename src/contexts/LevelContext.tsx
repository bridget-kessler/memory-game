import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  tBestTimes,
  tLevelsKey,
  tLevelsValue,
  tSelectedLevel,
} from "../types/types";
import { useGameContext } from "./GameContext";

type Props = {
  children: ReactNode;
};

type LevelContextType = {
  gridSize: tLevelsValue;
  difficulty: tLevelsKey;
  setLevel: Dispatch<React.SetStateAction<tSelectedLevel>>;
  timeElapsed: number;
  setTimeElapsed: Dispatch<React.SetStateAction<number>>;
  newRecord: boolean;
};

const LevelContext = createContext<LevelContextType>({} as LevelContextType);

const LevelContextProvider = ({ children }: Props) => {
  const { gameStatus } = useGameContext();
  const [level, setLevel] = useState<tSelectedLevel>({
    difficulty: "easy",
    gridSize: 4,
  });
  const [bestTime, setBestTime] = useState<tBestTimes>({
    easy: Infinity,
    medium: Infinity,
    hard: Infinity,
  });
  const [timeElapsed, setTimeElapsed] = useState<number>(Infinity);

  useEffect(() => {
    if (gameStatus === "start") {
      setBestTime({ ...bestTime, [level.difficulty]: timeElapsed });
      setTimeElapsed(Infinity);
    }
  }, [gameStatus]);

  return (
    <LevelContext.Provider
      value={{
        gridSize: level.gridSize,
        difficulty: level.difficulty,
        setLevel,
        timeElapsed,
        setTimeElapsed,
        newRecord: timeElapsed < bestTime[level.difficulty] ? true : false,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

const useLevelContext = () => {
  const context = useContext(LevelContext);

  if (context === undefined) {
    throw new Error(
      "useLevelContext must be used within a LevelContextProvider"
    );
  }
  return context;
};

export { LevelContextProvider, useLevelContext, LevelContext };
