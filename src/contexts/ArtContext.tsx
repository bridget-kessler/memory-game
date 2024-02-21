import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IArt, IArtCard } from "../types/types";
import useRandomArt from "../hooks/useRandomArt";
import { fallbackData } from "../assets/data/fallbackData";
import { useLevelContext } from "./LevelContext";
import { useGameContext } from "./GameContext";
import createDeck from "../utils/createDeck";

type Props = {
  children: ReactNode;
};

type ArtContextType = {
  isArtLoading: boolean;
  art: Array<IArt> | null;
  category: string | undefined;
  artCards: Array<IArtCard>;
  setArtCards: Dispatch<SetStateAction<IArtCard[]>>;
};

const ArtContext = createContext<ArtContextType>({} as ArtContextType);
// defaultValue argument of createContext is only used when there is no matching provider above it in the tree
// it can be useful when testing components in isolation when they're not wrapped with a provider

const ArtContextProvider = ({ children }: Props) => {
  const { gridSize } = useLevelContext();
  const { category, data, isLoading } = useRandomArt();
  const [artCards, setArtCards] = useState<Array<IArtCard>>(
    [] as Array<IArtCard>
  );

  useEffect(() => {
    if (!isLoading && data) {
      createDeck(data, gridSize).then((res) => setArtCards(res.slice(0, Math.pow(gridSize, 2) / 2)));
    }
  }, [isLoading]);

  return (
    <ArtContext.Provider
      value={{
        isArtLoading: isLoading,
        art: data || fallbackData,
        category: category?.title,
        artCards,
        setArtCards,
      }}
    >
      {children}
    </ArtContext.Provider>
  );
};

const useArtContext = () => {
  const context = useContext(ArtContext);

  if (context === undefined) {
    throw new Error("useArtContext must be used within a ArtContextProvider");
  }
  return context;
};

export { ArtContextProvider, useArtContext, ArtContext };