import { useEffect } from "react";
import useSWR from "swr";

import fetcher from "../lib/fetcher";
import { Views } from "../lib/types";

export default function ViewCounter({ path, slug, recordView = false }) {
  const { data } = useSWR<Views>(`/api/views/${path}/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const recordView = () =>
      fetch(`/api/views/${path}/${slug}`, { method: "POST" });

    // Record view only when deployed and set to track
    if (process.env.NODE_ENV !== "development" && recordView) {
      recordView();
    }
  }, [path, slug]);

  return <>{`${views > 0 ? views.toLocaleString() : "---"}`}</>;
}
