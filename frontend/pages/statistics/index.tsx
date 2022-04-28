import { InferGetStaticPropsType } from "next";

import Analytics from "../../components/Analytics";
import Meta from "../../components/Meta";
import TopProducts from "../../components/TopProducts";
import { getTotalBrands } from "../../lib/strapi/brands";
import { getCamerasAnalytics } from "../../lib/strapi/cameras";
import { getLensesAnalytics } from "../../lib/strapi/lenses";
import { ProductAnalytics } from "../../lib/types";

const Statistics = ({
  cameras,
  lenses,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const pageTitle = "Statistics";

  return (
    <>
      <Meta title={pageTitle} />
      <div className="pt-8 pb-10">
        <h1 className="mb-5 text-[2rem] font-bold leading-9 tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-none">
          {pageTitle}
        </h1>
        <Analytics cameras={cameras} lenses={lenses} brands={brands} />
        <TopProducts cameras={cameras} lenses={lenses} />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const cameras: ProductAnalytics = await getCamerasAnalytics();
  const lenses: ProductAnalytics = await getLensesAnalytics();
  const brands: ProductAnalytics = await getTotalBrands();

  return {
    props: {
      cameras,
      lenses,
      brands,
    },
    revalidate: 10,
  };
};

export default Statistics;
