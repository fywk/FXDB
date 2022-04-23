import { InferGetStaticPropsType } from "next";

import Analytics from "../../components/Analytics";
import Meta from "../../components/Meta";
import { getNumOfBrands } from "../../lib/strapi/brands";
import { getNumOfCameras } from "../../lib/strapi/cameras";
import { getNumOfLenses } from "../../lib/strapi/lenses";
import { NumOfItems } from "../../lib/types";

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
        <h1 className="text-4xl font-bold">{pageTitle}</h1>
        <Analytics cameras={cameras} lenses={lenses} brands={brands} />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const numOfCameras: NumOfItems = await getNumOfCameras();
  const numOfLenses: NumOfItems = await getNumOfLenses();
  const numOfBrands: NumOfItems = await getNumOfBrands();

  return {
    props: {
      cameras: numOfCameras,
      lenses: numOfLenses,
      brands: numOfBrands,
    },
    revalidate: 10,
  };
};

export default Statistics;
