interface IFood {
  description: string;
  lowercaseDescription: string;
  ingredients: string;
  foodNutrients: {
    nutrientName: string;
    nutrientNumber: string;
  }[]
}

export { IFood };
