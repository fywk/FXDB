export const humanizeLensMount = (lensMount: string) =>
  lensMount === "X-mount"
    ? "X Mount"
    : lensMount === "G-mount"
    ? "G Mount"
    : null;
