import { IArt, IArtCard, tLevelsValue } from "../types/types";
import createArtCard from "./createArtCard";

const createDeck = (
  data: IArt[],
  gridSize: tLevelsValue
): Promise<IArtCard[]> => {
  return Promise.all(
    data.slice(0, Math.pow(gridSize, 2) / 2).map(async el => await createArtCard(el))
  );
};

export default createDeck;
