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
    <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-3.5 lg:gap-4">
      <div className="md:col-span-6">
        <StatisticCard title="All-Time Views" data={siteWideViews} />
      </div>
      <div className="md:col-span-3">
        <StatisticCard title="All-Time Views: Cameras" data={camerasViews} />
      </div>
      <div className="md:col-span-3">
        <StatisticCard title="All-Time Views: Lenses" data={lensesViews} />
      </div>
      <div className="md:col-span-2">
        <StatisticCard
          title="Number of Cameras"
          data={cameras.meta.pagination.total}
          link="/cameras"
        />
      </div>
      <div className="md:col-span-2">
        <StatisticCard
          title="Number of Lenses"
          data={lenses.meta.pagination.total}
          link="/lenses"
        />
      </div>
      <div className="md:col-span-2">
        <StatisticCard
          title="Number of Brands"
          data={brands.meta.pagination.total}
          link="/brands"
        />
      </div>
    </div>
  );
};

const StatisticCard = ({
  title,
  data,
  link,
}: {
  title: string;
  data: number;
  link?: string;
}) => {
  return (
    <div className="aspect-[3.5] rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-transparent dark:bg-gray-800">
      <h2 className="font-medium leading-7">{title}</h2>
      <p className="text-fxdb text-[2.5rem] font-extrabold leading-10">
        {link ? (
          <Link href={link}>
            <a>
              <Statistic numbers={data} />
            </a>
          </Link>
        ) : (
          <Statistic numbers={data} />
        )}
      </p>
    </div>
  );
};

const Statistic = ({ numbers }) => {
  return numbers > 0 ? (
    <CountUp
      isCounting
      end={numbers}
      duration={0.5}
      easing="linear"
      formatter={(value) => Math.trunc(value).toLocaleString()}
    />
  ) : (
    <>---</>
  );
};

export default Analytics;
