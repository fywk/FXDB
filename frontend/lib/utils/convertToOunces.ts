// Convert weight from grams to ounces
export const convertToOunces = (weightInGrams: number) =>
  Math.round(weightInGrams * 0.03527396194958 * 100) / 100;
