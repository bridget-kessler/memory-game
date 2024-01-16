import {
  Dispatch,
  ReactNode,
  createContext,
  useState,
} from "react";
import { tLevelsKey, tLevelsValue, tSelectedLevel } from "../types/types";

type Props = {
  children: ReactNode;
};

type LevelContextType = {
  gridSize: tLevelsValue;
  difficulty: tLevelsKey;
  setLevel: Dispatch<React.SetStateAction<tSelectedLevel>>;
};

export const LevelContext = createContext<LevelContextType>(
  {} as LevelContextType
);

export const LevelContextProvider = ({ children }: Props) => {
  const [level, setLevel] = useState<tSelectedLevel>({
    difficulty: "easy",
    gridSize: 4,
  });

  return (
    <LevelContext.Provider
      value={{
        gridSize: level.gridSize,
        difficulty: level.difficulty,
        setLevel,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};
