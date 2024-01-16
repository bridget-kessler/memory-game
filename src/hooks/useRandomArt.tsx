import { useContext, useEffect, useState } from "react";
import { IApiResponseModel, IArt } from "../types/types";
import { LevelContext } from "../contexts/levelContext";
import { GameContext } from "../contexts/gameContext";
import { getRandomCategory } from "../utils/useRandomArt.constants";
import { fallbackData } from "../assets/data/fallbackData";

const useRandomArt = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<null | {}>(null);
  const [data, setData] = useState<[] | Array<IArt>>([]);
  const [category, setCategory] = useState<null | {
    categoryType: string;
    title: string;
    id?: string;
  }>(null);
  const { gridSize } = useContext(LevelContext);
  const { gameStatus } = useContext(GameContext);

  const fetchRandomArt = async () => {
    try {
      if (!category) {
        setCategory({ categoryType: "artist", title: "Vincent Van Gogh" })
        setData(fallbackData);
        return;
      }

      let query: {
        term?: { [key: string]: string };
        match?: {};
      } = {};

      if (category.id) {
        const term: string = `${category.categoryType}_ids`;
        query.term = { [term]: category.id };
      }

      if (category?.categoryType === "artist") {
        const match: string = `${category.categoryType}_title`;
        query.match = {
          [match]: { query: category.title },
        };
      }

      // Elasticsearch DSL query
      const rawDSLQuery: {} = {
        query: {
          bool: {
            must: [
              {
                term: { is_public_domain: true },
              },
              query || "",
            ],
          },
        },
        fields:
          "image_id,title,date_display,artist_display,place_of_origin,medium_display,is_public_domain,thumbnail",
        limit: Math.pow(gridSize, 2) / 2,
      };
      const url = `https://api.artic.edu/api/v1/artworks/search?params=${encodeURIComponent(
        JSON.stringify(rawDSLQuery)
      )}`;

      const promise = await fetch(url);
      if (promise.status >= 400) {
        throw new Error("Error");
      } else {
        const result = await promise.json();
        const baseURL = `${result.config.iiif_url}/`;
        const { data } = result;

        const artData = data.map((artwork: IApiResponseModel) => {
            const {
              image_id,
              artist_display,
              title,
              date_display,
              medium_display,
              place_of_origin,
              thumbnail: { width, height, lqip, alt_text },
            } = artwork;

            return {
              id: image_id,
              img_url: baseURL + image_id + "/full/843,/0/default.jpg",
              alt_text,
              artist: artist_display,
              title: title,
              date: date_display,
              medium: medium_display,
              place_of_origin,
              aspect_ratio: width / height,
              lqip,
            };
          });
          console.log({artData})
        localStorage.setItem(category?.title, JSON.stringify(artData));
        setData(artData);
      }
    } catch (err) {
      setIsError({ msg: err });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (gameStatus === "start") {
      setCategory(getRandomCategory());
    }
    if (category && gameStatus === "loading") {
      setIsLoading(true);
      const cachedData = localStorage.getItem(category.title);

      if (!cachedData) {
        console.log("no cached data")
        fetchRandomArt();
      }  

      // Check if data exists
      if (typeof cachedData === "string") {
        const parsedData = JSON.parse(cachedData);

        if (parsedData.length < Math.pow(gridSize, 2) / 2) {
          console.log({parsedData: parsedData.length, uniqueCards: Math.pow(gridSize, 2) / 2}, "not enough data")

          fetchRandomArt();
        } else {
          console.log("cached data", { data: JSON.parse(cachedData) })

          setData(JSON.parse(cachedData));
          setIsLoading(false);
        }
      }
    }
  }, [gameStatus]);

  return { data, isError, isLoading, category };
};

export default useRandomArt;
