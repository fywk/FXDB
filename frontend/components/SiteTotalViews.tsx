import useSWR from "swr";

import fetcher from "../lib/fetcher";
import { AllTimeViews } from "../lib/types";

export default function SiteTotalViews({
  category,
}: {
  category: "all-time" | "cameras" | "lenses";
}) {
  const { data } = useSWR<AllTimeViews>("/api/views", fetcher);
  const allTimeViews = new Number(data?.views.total);
  const cameraViews = new Number(data?.views.cameras);
  const lensViews = new Number(data?.views.lenses);

  switch (category) {
    case "all-time":
      return <>{allTimeViews > 0 ? allTimeViews.toLocaleString() : "---"}</>;
    case "cameras":
      return <>{cameraViews > 0 ? cameraViews.toLocaleString() : "---"}</>;
    case "lenses":
      return <>{lensViews > 0 ? lensViews.toLocaleString() : "---"}</>;
  }
}
