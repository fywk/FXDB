import useSWR from "swr";

import fetcher from "../lib/fetcher";
import { AllTimeViews } from "../lib/types";

export default function SiteAnalytics({
  category,
}: {
  category: "site-wide" | "cameras" | "lenses";
}) {
  const { data } = useSWR<AllTimeViews>("/api/views", fetcher);
  const [allTimeViews, camerasViews, lensesViews] = [
    new Number(data?.views.allTime),
    new Number(data?.views.cameras),
    new Number(data?.views.lenses),
  ];

  switch (category) {
    case "site-wide":
      return <>{allTimeViews > 0 ? allTimeViews.toLocaleString() : "---"}</>;
    case "cameras":
      return <>{camerasViews > 0 ? camerasViews.toLocaleString() : "---"}</>;
    case "lenses":
      return <>{lensesViews > 0 ? lensesViews.toLocaleString() : "---"}</>;
  }
}
