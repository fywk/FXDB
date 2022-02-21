import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { AllTimeViews } from "../lib/types";

export default function SiteTotalViews() {
  const { data } = useSWR<AllTimeViews>("/api/views", fetcher);
  const views = new Number(data?.views.total);

  return <>{views > 0 ? views.toLocaleString() : "---"}</>;
}
