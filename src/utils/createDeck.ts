import { IArt, IArtCard, tLevelsValue } from "../types/types";
import createArtCard from "./createArtCard";

const createDeck = (data: IArt[], gridSize: tLevelsValue): Promise<IArtCard[]> => {
    console.log({ data, gridSize })
    let promises = [];

    for (let i = 0; i < (Math.pow(gridSize, 2) / 2); i++) {
        if (data[i]) {
            promises.push(createArtCard(data[i]));
        }
    }

    return Promise.all(promises);
};

export default createDeck;