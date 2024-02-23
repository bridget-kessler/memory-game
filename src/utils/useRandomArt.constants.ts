export const categories: {
  [key: string]: string[] | Array<{ title: string; id: string }>;
} = {
  artist: [
    "Vincent van Gogh",
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
    "James McNeil Whistler",
  ],
  style: [
    {
      title: "19th Century",
      id: "TM-13203",
    },
    { title: "Arts and Crafts Movement", id: "TM-7569" },
    { title: "Folk Art", id: "TM-12125" },
    { title: "Pictorialism", id: "TM-7546" },
    { title: "Korean", id: "TM-5182" },
    { title: "Syrian", id: "TM-4531" },
    { title: "Peruvian", id: "TM-10469" },
    { title: "Greek", id: "TM-4408" },
    { title: "Chinese", id: "TM-4303" },
    { title: "Eqyptian", id: "TM-4805" },
    { title: "Persian", id: "TM-4811" },
  ],
  subject: [
    { title: "Cityscapes", id: "TM-8762" },
    { title: "Architecture", id: "TM-12085" },
    { title: "Green (Color)", id: "TM-11849" },
    { title: "Plants", id: "TM-12058" },
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
