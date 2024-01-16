import uniqid from 'uniqid';
// import formatArray from './formatArray';
import shuffleArray from '../utils/shuffleArray';
import { useContext, useEffect, useState } from 'react';
import { ArtContext } from '../contexts/artContext';
import { LevelContext } from '../contexts/levelContext';
import { IArt } from '../types/types';
import { GameContext } from '../contexts/gameContext';

const useSplitImage = () => {
    const { art, artCards, setArtCards } = useContext(ArtContext);
    const { gridSize } = useContext(LevelContext);

    const createArtCard = async (art: IArt) => {
        let artCard = {
            id: art?.title,
            key: uniqid()
        };
        const imgHeight = 843 / art?.aspect_ratio;
        const img = new Image(843, imgHeight);
        img.crossOrigin = "anonymous"; // Necessary when using Canvas API
        img.src = art?.img_url;

        const result = await new Promise((resolve) => {
            img.onload = function(){
                console.log("loaded")
                const canvas: HTMLCanvasElement = document.createElement('canvas');
                canvas.width = 120;
                canvas.height = 120;
                const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
                /*  drawImage(
                    image: the source img,
                    sx: x-axis coordinate of the top-left corner of source img, 
                    sy: y-axis coordinate of the top-left corner of source img, 
                    sWidth: width of the subrect of the source img,
                    sHeight: height of the subrect of the source img,,
                    dx: x-axis coordinate of the top-left corner of destination canvas, 
                    dy: y-axis coordinate of the top-left corner of destination canvas,
                    dWidth: width of destination canvas,
                    dHeight: height of destination canvas
                ) 
                */
    
                // Math.floor(Math.random() * (843 - 120)) length - 120
                ctx?.drawImage(
                    img,
                    Math.floor(Math.random() * (843 - 120)),
                    Math.floor(Math.random() * (imgHeight - 120)),
                    120,
                    120,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    
                artCard.img = canvas.toDataURL("image/jpeg", 0.7);
                resolve(artCard)
            }
        })
        return result;
    }

    useEffect(() => {
        const getArtCards = async () => {
            let artCards = [];
        
            if (art) {
                for (let i = 0; i < Math.pow(gridSize, 2) / 2; i++) {
                    const artCard = await createArtCard(art[i]);
                    artCards.push(artCard);
                }
                setArtCards(shuffleArray(artCards))
            }

        }
        if (art) {
            getArtCards()
        }
    }, [art?.length])

    return artCards;
  }

  export default useSplitImage;