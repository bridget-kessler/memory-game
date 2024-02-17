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
    id: art?.title,
    key: uniqid(),
    img: url,
  };

  // const result: Promise<IArtCard> = new Promise((resolve, reject) => {
  //     img.onload = function(){
  //         /*  drawImage(
  //             image: the source img,
  //             sx: x-axis coordinate of the top-left corner of source img,
  //             sy: y-axis coordinate of the top-left corner of source img,
  //             sWidth: width of the subrect of the source img,
  //             sHeight: height of the subrect of the source img,,
  //             dx: x-axis coordinate of the top-left corner of destination canvas,
  //             dy: y-axis coordinate of the top-left corner of destination canvas,
  //             dWidth: width of destination canvas,
  //             dHeight: height of destination canvas
  //         )
  //         */

  //         // Math.floor(Math.random() * (843 - 120)) length - 120
  //         ctx?.drawImage(
  //             img,
  //             Math.floor(Math.random() * (843 - 120)),
  //             imgHeight ? Math.floor(Math.random() * (imgHeight - 120)) : 0,
  //             120,
  //             120,
  //             0,
  //             0,
  //             canvas.width,
  //             canvas.height
  //         );

  //         artCard.img = canvas.toDataURL("image/jpeg", 0.7);
  //         resolve(artCard)
  //     }
  // })
  //   img.onload((e) => {
  //     ctx?.drawImage(
  //       img,
  //       Math.floor(Math.random() * (843 - 120)),
  //       imgHeight ? Math.floor(Math.random() * (imgHeight - 120)) : 0,
  //       120,
  //       120,
  //       0,
  //       0,
  //       canvas.width,
  //       canvas.height
  //     );

  //     artCard.img = canvas.toDataURL("image/jpeg", 0.7);
  //   });
  //   return result;
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
