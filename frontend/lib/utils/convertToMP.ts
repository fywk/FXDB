// Convert X and Y resolution into megapixels
export const convertToMP = (resolutionX: number, resolutionY: number) =>
  Math.round((resolutionX * resolutionY) / 1_000_000);
