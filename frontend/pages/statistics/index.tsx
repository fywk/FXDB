import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement } from "react";

import Meta from "../../components/Meta";
import SiteTotalViews from "../../components/SiteTotalViews";
import {
  getNumOfBrands,
  getNumOfCameras,
  getNumOfLenses
} from "../../lib/strapi/api";

export default function Statistics({
  cameras,
  lenses,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Statistics" />
      <div className="space-y-5 py-10">
        <h1 className="text-4xl font-bold">Statistics</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <div className="md:col-span-6">
            <StatsCard
              title="All-Time Views"
              data={<SiteTotalViews category="all-time" />}
            />
          </div>
          <div className="md:col-span-3">
            <StatsCard
              title="All-Time Views (Cameras)"
              data={<SiteTotalViews category="cameras" />}
            />
          </div>
          <div className="md:col-span-3">
            <StatsCard
              title="All-Time Views (Lenses)"
              data={<SiteTotalViews category="lenses" />}
            />
          </div>
          <div className="md:col-span-2">
            <StatsCard
              title="Number of Cameras"
              data={cameras.meta.pagination.total.toLocaleString()}
            />
          </div>
          <div className="md:col-span-2">
            <StatsCard
              title="Number of Lenses"
              data={lenses.meta.pagination.total.toLocaleString()}
            />
          </div>
          <div className="md:col-span-2">
            <StatsCard
              title="Number of Brands"
              data={brands.meta.pagination.total.toLocaleString()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const numOfCameras = await getNumOfCameras();
  const numOfLenses = await getNumOfLenses();
  const numOfBrands = await getNumOfBrands();

  return {
    props: {
      cameras: numOfCameras,
      lenses: numOfLenses,
      brands: numOfBrands,
    },
    revalidate: 10,
  };
};

export function StatsCard({
  title,
  data,
}: {
  title: string;
  data: string | ReactElement;
}) {
  return (
    <div className="space-y-1 rounded-lg border border-gray-200 bg-white px-5 py-6 dark:border-gray-800 dark:bg-inherit md:space-y-1.5">
      <h2 className="text-[15px] lg:text-base">{title}</h2>
      <p className="text-fxdb text-4xl font-bold lg:text-5xl">{data}</p>
    </div>
  );
}
