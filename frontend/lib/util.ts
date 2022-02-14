export const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

// Convert weight from grams to ounces
export const convertToOunces = (weightInGrams: number) =>
  Math.round(weightInGrams * 0.03527396194958 * 100) / 100;

export const convertToMP = (resolutionX: number, resolutionY: number) =>
  `${Math.round((resolutionX * resolutionY) / 1_000_000)} MP`;
