import useSWR from "swr";

import fetcher from "../lib/fetcher";
import { AllTimeViews } from "../lib/types";

export default function Analytics({
  category,
}: {
  category: "site-wide" | "cameras" | "lenses";
}) {
  const { data } = useSWR<AllTimeViews>("/api/views", fetcher);
  const [siteWideViews, camerasViews, lensesViews] = [
    new Number(data?.views.siteWide),
    new Number(data?.views.cameras),
    new Number(data?.views.lenses),
  ];

  switch (category) {
    case "site-wide":
      return <>{siteWideViews > 0 ? siteWideViews.toLocaleString() : "---"}</>;
    case "cameras":
      return <>{camerasViews > 0 ? camerasViews.toLocaleString() : "---"}</>;
    case "lenses":
      return <>{lensesViews > 0 ? lensesViews.toLocaleString() : "---"}</>;
  }
}
