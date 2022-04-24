import Link from "next/link";
import useSWR from "swr";
import { CountUp } from "use-count-up";

import { AllTimeViews, AnalyticsProps } from "../lib/types";
import fetcher from "../lib/utils/fetcher";

const Analytics = ({ cameras, lenses, brands }: AnalyticsProps) => {
  const { data } = useSWR<AllTimeViews>("/api/views", fetcher);
  const [siteWideViews, camerasViews, lensesViews] = [
    Number(data?.views.siteWide),
    Number(data?.views.cameras),
    Number(data?.views.lenses),
  ];

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-6 lg:gap-4">
      <div className="sm:col-span-2 md:col-span-6">
        <StatCard title="Total Page Views" numbers={siteWideViews} />
      </div>
      <div className="md:col-span-3">
        <StatCard title="Page Views: Cameras" numbers={camerasViews} />
      </div>
      <div className="md:col-span-3">
        <StatCard title="Page Views: Lenses" numbers={lensesViews} />
      </div>
      <div className="md:col-span-2">
        <Link href="/cameras">
          <a>
            <StatCard
              title="Total Cameras"
              numbers={data && cameras.meta.pagination.total}
            />
          </a>
        </Link>
      </div>
      <div className="md:col-span-2">
        <Link href="/lenses">
          <a>
            <StatCard
              title="Total Lenses"
              numbers={data && lenses.meta.pagination.total}
            />
          </a>
        </Link>
      </div>
      <div className="md:col-span-2">
        <Link href="/brands">
          <a>
            <StatCard
              title="Total Brands"
              numbers={data && brands.meta.pagination.total}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

const StatCard = ({ title, numbers }: { title: string; numbers: number }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-transparent dark:bg-gray-800 sm:aspect-[3.5]">
      <div className="text-brightess leading-7">{title}</div>
      <div className="text-fxdb text-[2.5rem] font-extrabold leading-10">
        {numbers > 0 ? (
          <CountUp
            isCounting
            end={numbers}
            duration={1}
            easing="linear"
            formatter={(value) => Math.trunc(value).toLocaleString()}
          />
        ) : (
          <>--</>
        )}
      </div>
    </div>
  );
};

export default Analytics;
