import { useEffect } from "react";
import useSWR from "swr";

import { Views } from "../lib/types";
import fetcher from "../lib/utils/fetcher";

export default function ViewCounter({
  path,
  slug,
  trackView = false,
}: {
  path: string;
  slug: string;
  trackView?: boolean;
}) {
  const { data } = useSWR<Views>(`/api/views/${path}/${slug}`, fetcher);
  const views = new Number(data?.views);

  useEffect(() => {
    const recordView = () =>
      fetch(`/api/views/${path}/${slug}`, { method: "POST" });

    // Record view only when deployed and set to track
    if (process.env.NODE_ENV !== "development" && trackView) {
      recordView();
    }
  }, [path, slug, trackView]);

  return <>{views > 0 ? views.toLocaleString() : "---"}</>;
}
