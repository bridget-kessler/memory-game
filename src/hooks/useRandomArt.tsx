import { useEffect, useState } from "react";
import { IApiResponseModel, IArt } from "../types/types";
import { useLevelContext } from "../contexts/LevelContext";
import { useGameContext } from "../contexts/GameContext";
import { getRandomCategory } from "../utils/useRandomArt.constants";
import { fallbackData } from "../assets/data/fallbackData";

const useRandomArt = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<null | { message: string }>(null);
  const [data, setData] = useState<Array<IArt>>(fallbackData);
  const [category, setCategory] = useState<{
    categoryType: string;
    title: string;
    id?: string;
  }>({ categoryType: "artist", title: "Claude Monet" });
  const { gridSize } = useLevelContext();
  const { gameStatus } = useGameContext();

  const fetchRandomArt = async (offset = 0, existingData: null | [] = null) => {
    try {
      if (!category) {
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
              // require existence of an image
              {
                exists: { field: "thumbnail" },
              },
              query,
            ],
          },
        },
        from: offset,
        fields:
          "image_id,title,date_display,artist_display,place_of_origin,medium_display,is_public_domain,thumbnail",
        size: Math.pow(gridSize, 2) / 2 - offset,
      };

      const url = `https://api.artic.edu/api/v1/artworks/search?params=${encodeURIComponent(
        JSON.stringify(rawDSLQuery)
      )}`;

      const headers = new Headers({
        "Content-Type": "application/json",
        "AIC-User-Agent": "Memory Game (artmemorygame7@gmail.com)",
      });

      const promise = await fetch(url, {
        headers
      });
      if (promise.status >= 400) {
        throw new Error();
      } else {
        const result = await promise.json();
        const baseURL = `${result.config.iiif_url}/`;
        const { data } = result;

        if (data?.length < Math.pow(gridSize, 2) / 2 - offset) {
          throw new Error();
        }

        const artData = data.map((artwork: IApiResponseModel): IArt => {
          const {
            is_public_domain,
            image_id,
            artist_display,
            title,
            date_display,
            medium_display,
            place_of_origin,
            thumbnail: { width, height, lqip, alt_text },
          } = artwork;

          if (!is_public_domain || !image_id || !height || !lqip || !alt_text) {
            throw new Error("Insufficient data");
          }

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
        const allData = existingData ? existingData.concat(artData) : artData;

        localStorage.setItem(category.title, JSON.stringify(allData));
        setData(allData);
        setIsLoading(false);
      }
    } catch (e) {
      setCategory({ categoryType: "artist", title: "Claude Monet" });
      setData(fallbackData);
      let message = e instanceof Error ? e.message : "Unknown error";
      setIsError({ message });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameStatus === "start") {
      setCategory(getRandomCategory());
      setIsLoading(true);
    }
    if (gameStatus === "loading") {
      if (category.title === "Claude Monet") {
        setData(fallbackData);
        setIsLoading(false);
      } else {
        const cachedData = localStorage.getItem(category.title);

        if (!cachedData) {
          fetchRandomArt();
        }

        if (typeof cachedData === "string") {
          const parsedData = JSON.parse(cachedData);

          if (parsedData.length < Math.pow(gridSize, 2) / 2) {
            fetchRandomArt(parsedData.length, parsedData);
          } else {
            setData(JSON.parse(cachedData));
            setIsLoading(false);
          }
        }
      }
    }
  }, [gameStatus]);

  return { data, isError, isLoading, category };
};

export default useRandomArt;
