export default function getTotalViews(obj: { [s: string]: number }) {
  return Object.values(obj).reduce((a, b) => a + b);
}
