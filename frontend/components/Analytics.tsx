import useSWR from "swr";

import { Analytics, AnalyticsProps } from "../lib/types";
import fetcher from "../lib/utils/fetcher";

const Analytics = ({ cameras, lenses, brands }: AnalyticsProps) => {
  const { data } = useSWR<Analytics>("/api/views", fetcher);
  const [totalViews, camerasViews, lensesViews] = [
    data?.total,
    data?.cameras,
    data?.lenses,
  ];

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-6 md:gap-4">
      <div className="sm:col-span-6">
        <StatCard title="Total Page Views" numbers={totalViews} />
      </div>
      <div className="sm:col-span-3">
        <StatCard title="Page Views: Cameras" numbers={camerasViews} />
      </div>
      <div className="sm:col-span-3">
        <StatCard title="Page Views: Lenses" numbers={lensesViews} />
      </div>
      <div className="sm:col-span-2">
        <StatCard
          title="Total Cameras"
          numbers={data && cameras.meta.pagination.total}
        />
      </div>
      <div className="sm:col-span-2">
        <StatCard
          title="Total Lenses"
          numbers={data && lenses.meta.pagination.total}
        />
      </div>
      <div className="sm:col-span-2">
        <StatCard
          title="Total Brands"
          numbers={data && brands.meta.pagination.total}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, numbers }: { title: string; numbers: number }) => {
  return (
    <div className="rounded-xl bg-white px-6 py-4 ring-1 ring-gray-200/75 dark:bg-gray-800/75 dark:ring-gray-800/75 sm:aspect-[3.75]">
      <div className="text-brighter leading-7">{title}</div>
      <div className="text-fxdb text-[2.5rem] font-extrabold leading-10">
        {numbers > 0 ? numbers.toLocaleString() : "--"}
      </div>
    </div>
  );
};

export default Analytics;
