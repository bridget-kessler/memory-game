export interface IArtCard {
  key: string;
  id: string;
  title: string,
  img: string;
}

export interface IApiResponseModel {
  is_public_domain: boolean;
  image_id: string;
  artist_display: string;
  title: string;
  date_display: string;
  medium_display: string;
  place_of_origin: string;
  thumbnail: {
    width: number;
    height: number;
    lqip: string;
    alt_text: string;
  };
}

export interface IArt {
  id: string;
  img_url: string;
  alt_text: string;
  artist: string;
  title: string;
  date: string;
  medium: string;
  place_of_origin: string;
  aspect_ratio: number;
  lqip: string;
}

// generate types from key/value pairs
export type tLevels = typeof levels;
export type tLevelsKey = keyof tLevels;
export type tLevelsValue = (typeof levels)[tLevelsKey];

export type tSelectedLevel = {
  difficulty: tLevelsKey;
  gridSize: tLevelsValue;
};


// Const assertion - object literal with readonly properties
export const levels = {
  easy: 4,
  medium: 6,
  hard: 8,
} as const;

// Mapped type
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type tLevelsArray = Entries<tLevels>

export const levelsArray = Object.entries(levels) as tLevelsArray;

export type tBestTimes = {
  [key in tLevelsKey]: number;
}