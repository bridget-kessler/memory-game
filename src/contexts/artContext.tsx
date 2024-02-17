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
import { LevelContext } from "./levelContext";
import { GameContext } from "./gameContext";
import createArtCard from "../utils/createArtCard";
import shuffleArray from "../utils/shuffleArray";
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

export const ArtContext = createContext<ArtContextType>({} as ArtContextType);
// defaultValue argument of createContext is only used when there is no matching provider above it in the tree
// it can be useful when testing components in isolation when they're not wrapped with a provider

export const ArtContextProvider = ({ children }: Props) => {
  const { gridSize } = useContext(LevelContext);
  const { gameStatus } = useContext(GameContext);
  const { category, data, isLoading, isError } = useRandomArt();
  const [artCards, setArtCards] = useState<Array<IArtCard>>(
    [] as Array<IArtCard>
  );

  useEffect(() => {
    if (data && gameStatus === "loading") {
      console.log("use effect game loading", { data });
      createDeck(data, gridSize)
        .then((res) => {
          setArtCards(res)
          console.log({ res })})
        .catch((err) => console.log({ err }));
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
