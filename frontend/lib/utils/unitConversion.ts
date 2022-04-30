// Convert X and Y resolutions into megapixels
export const convertToMP = (resolutionX: number, resolutionY: number) =>
  Math.round((resolutionX * resolutionY) / 1_000_000);

// Convert weight from grams to ounces (round to two decimal places)
export const convertToOunces = (weightInGrams: number) =>
  Math.round(weightInGrams * 0.03527396194958 * 100) / 100;
