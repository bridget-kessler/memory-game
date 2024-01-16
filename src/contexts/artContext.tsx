import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import FallbackImg from "../assets/images/the_bedroom.jpg";
import { IArt, IArtCard } from "../types/types";
import useRandomArt from "../hooks/useRandomArt";
import uniqid from "uniqid";
import shuffleArray from "../utils/shuffleArray";
import createArtCard from "../utils/createArtCard";
import { fallbackData } from "../assets/data/fallbackData";

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
  const { category, data, isLoading, isError } = useRandomArt();
  const [artCards, setArtCards] = useState<Array<IArtCard>>(
    [] as Array<IArtCard>
  );

  return (
    <ArtContext.Provider
      value={{
        isArtLoading: isLoading,
        art: data || fallbackData,
        category: category?.title,
        artCards,
        setArtCards
      }}
    >
      {children}
    </ArtContext.Provider>
  );
};
