import { IArtCard } from "../types/types";

const shuffleArray = (array: IArtCard[]) => {
    let shuffledArr = array.slice(0);

    for (let i = 0; i < array.length; i++) {
        // Select a random index within the array
        const randomIndex = Math.floor(Math.random() * array.length);  
        // Swap the current item with the item at randomly-selected index
        [shuffledArr[i], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[i]];
    }
    return shuffledArr;
}

export default shuffleArray;