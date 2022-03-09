export const dateFormatter = (month: "long" | "short") =>
  new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: month,
    day: "numeric",
  });
