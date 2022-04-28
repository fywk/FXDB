import { useEffect } from "react";
import useSWR from "swr";

import { ViewCounterProps, Views } from "../lib/types";
import fetcher from "../lib/utils/fetcher";

export default function ViewCounter({ path, slug }: ViewCounterProps) {
  const url = `/api/views/${path}/${slug}`;
  const { data } = useSWR<Views>(url, fetcher);
  const views = data?.views;

  useEffect(() => {
    const recordView = () =>
      fetch(url, {
        method: "POST",
      });

    // Record view when deployed (in production environment)
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
      recordView();
    }
  }, [url]);

  return <>{views > 0 ? views.toLocaleString() : "---"}</>;
}
