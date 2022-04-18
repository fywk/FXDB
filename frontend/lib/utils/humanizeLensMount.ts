export const humanizeLensMount = (lensMount: string) =>
  lensMount === "X-mount"
    ? "X mount"
    : lensMount === "G-mount"
    ? "G mount"
    : null;
