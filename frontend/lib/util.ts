// Convert weight from grams to ounces
export const convertToOunces = (weightInGrams: number) =>
  Math.round(weightInGrams * 0.03527396194958 * 100) / 100;

// Get megapixels count from X and Y resolution
export const convertToMP = (resolutionX: number, resolutionY: number) =>
  `${Math.round((resolutionX * resolutionY) / 1_000_000)} MP`;

export const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export const humanizeLensMount = (lensMount: string) =>
  lensMount === "X-mount"
    ? "X Mount"
    : lensMount === "G-mount"
    ? "G Mount"
    : null;
