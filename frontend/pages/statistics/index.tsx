import { InferGetStaticPropsType } from "next";

import Analytics from "../../components/Analytics";
import Meta from "../../components/Meta";
import { getTotalBrands } from "../../lib/strapi/brands";
import { getTotalCameras } from "../../lib/strapi/cameras";
import { getTotalLenses } from "../../lib/strapi/lenses";
import { TotalItems } from "../../lib/types";

const Statistics = ({
  cameras,
  lenses,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const pageTitle = "Statistics";

  return (
    <>
      <Meta title={pageTitle} />
      <div className="space-y-5 pt-8 pb-10">
        <h1 className="text-[2rem] font-bold leading-9 tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-none">
          {pageTitle}
        </h1>
        <Analytics cameras={cameras} lenses={lenses} brands={brands} />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const totalCameras: TotalItems = await getTotalCameras();
  const totalLenses: TotalItems = await getTotalLenses();
  const totalBrands: TotalItems = await getTotalBrands();

  return {
    props: {
      cameras: totalCameras,
      lenses: totalLenses,
      brands: totalBrands,
    },
    revalidate: 10,
  };
};

export default Statistics;
