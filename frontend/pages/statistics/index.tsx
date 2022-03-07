import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ReactElement } from "react";

import Analytics from "../../components/Analytics";
import Meta from "../../components/Meta";
import { getNumOfBrands } from "../../lib/strapi/brands";
import { getNumOfCameras } from "../../lib/strapi/cameras";
import { getNumOfLenses } from "../../lib/strapi/lenses";

export default function Statistics({
  cameras,
  lenses,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Statistics" />
      <div className="space-y-5 py-10">
        <h1 className="text-3xl font-bold md:text-4xl">Statistics</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-3.5 lg:gap-4">
          <div className="md:col-span-6">
            <StatsCard
              title="All-Time Views"
              data={<Analytics category="site-wide" />}
            />
          </div>
          <div className="md:col-span-3">
            <StatsCard
              title="All-Time Views: Cameras"
              data={<Analytics category="cameras" />}
            />
          </div>
          <div className="md:col-span-3">
            <StatsCard
              title="All-Time Views: Lenses"
              data={<Analytics category="lenses" />}
            />
          </div>
          <div className="md:col-span-2">
            <StatsCard
              title="Number of Cameras"
              data={cameras.meta.pagination.total.toLocaleString()}
              link="/cameras"
            />
          </div>
          <div className="md:col-span-2">
            <StatsCard
              title="Number of Lenses"
              data={lenses.meta.pagination.total.toLocaleString()}
              link="/lenses"
            />
          </div>
          <div className="md:col-span-2">
            <StatsCard
              title="Number of Brands"
              data={brands.meta.pagination.total.toLocaleString()}
              link="/brands"
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
  link,
}: {
  title: string;
  data: string | ReactElement;
  link?: string;
}) {
  return (
    <div className="aspect-[3.5] space-y-1 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-inherit md:space-y-1.5 lg:p-6">
      <h2>{title}</h2>
      <p className="text-fxdb text-[2.5rem] font-extrabold leading-none">
        {link ? (
          <Link href={link}>
            <a>{data}</a>
          </Link>
        ) : (
          <>{data}</>
        )}
      </p>
    </div>
  );
}
