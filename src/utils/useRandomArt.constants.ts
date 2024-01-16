import { IArt } from "../types/types";
import uniqid from 'uniqid';

export const categories: {
  [key: string]: string[] | Array<{ title: string; id: string }>;
} = {
  artist: [
    "Vincent Van Gogh",
    "Paul Cezanne",
    "Edvard Munch",
    "Katsushika Hokusai",
    "Mary Cassatt",
    "Utagawa Hiroshige",
    "Claude Monet",
    "Henri de Toulouse-Lautrec",
    "Piet Mondrian",
    "Edgar Degas",
    "Paul Gauguin",
    "Juan Sanchez Cotan",
    "Edouard Manet",
    "Odilon Redon",
    "James McNeil Whistler"
  ],
  style: [
    {
      title: "19th Century",
      id: "TM-13203",
    },
    { title: "Japanese", id: "TM-13203" },
    { title: "Chinese", id: "TM-4303" },
  ],
  subject: [
    { title: "Cityscapes", id: "TM-8762" },
    { title: "Landscapes", id: "TM-8657" },
  ],
};

export const getRandomCategory: () => {
  categoryType: string;
  title: string;
  id?: string;
} = () => {
  const allCategoryTypes = Object.keys(categories);
  const categoryType: string =
    allCategoryTypes[Math.floor(Math.random() * allCategoryTypes.length)];
  const randomCategory =
    categories[categoryType][
      Math.floor(Math.random() * categories[categoryType].length)
    ];
  if (typeof randomCategory === "object") {
    return {
      categoryType,
      title: randomCategory.title,
      id: randomCategory.id,
    };
  }
  return {
    categoryType,
    title: randomCategory,
  };
};

