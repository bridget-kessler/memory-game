import uniqid from "uniqid";
import { IArt, IArtCard } from "../types/types";

const createArtCard = async (art: IArt): Promise<IArtCard> => {
  let imgHeight;

  if (art?.aspect_ratio) {
    imgHeight = 843 / art.aspect_ratio;
  }

  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = 120;
  canvas.height = 120;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const image: HTMLImageElement = await loadImage(art.img_url);

  ctx?.drawImage(
    image,
    Math.floor(Math.random() * (843 - 120)),
    imgHeight ? Math.floor(Math.random() * (imgHeight - 120)) : 0,
    120,
    120,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const url = await canvas.toDataURL("image/jpeg", 0.7);

  return {
    id: art.id,
    title: art.title,
    key: uniqid(),
    img: url,
  };

};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image(843);
    img.crossOrigin = "anonymous"; // Necessary when using Canvas API
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(img);
  });
};

export default createArtCard;
