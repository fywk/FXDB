import { useEffect } from "react";
import useSWR from "swr";

import { ViewCounterProps, Views } from "../lib/types";
import fetcher from "../lib/utils/fetcher";

export default function ViewCounter({
  path,
  slug,
  trackView = false,
}: ViewCounterProps) {
  const url = `/api/views/${path}/${slug}`;
  const { data } = useSWR<Views>(url, fetcher);
  const views = Number(data?.total);

  useEffect(() => {
    const recordView = () =>
      fetch(url, {
        method: "POST",
      });

    // Record view when deployed (in production environment) and set to track
    if (process.env.VERCEL_ENV === "production" && trackView) {
      recordView();
    }
  }, [url, trackView]);

  return <>{views > 0 ? views.toLocaleString() : "---"}</>;
}
