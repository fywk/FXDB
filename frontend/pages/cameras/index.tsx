import { GetStaticProps } from "next";

import Meta from "../../components/Meta";
import ProductCard from "../../components/product/ProductCard";
import { getAllCameras } from "../../lib/strapi/cameras";

export default function Cameras({ cameras, imageUrl }) {
  /*
    Sort by:
      Release date (desc)
      Release date (asc)
  */

  return (
    <>
      <Meta title="Cameras" />
      <div className="py-8">
        <div className="flex flex-col space-y-8">
          <section className="mx-auto mb-4 flex max-w-lg flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-medium underline underline-offset-8">
              Cameras
            </h1>
            <p className="">{`Total of ${cameras.length} cameras found.`}</p>
          </section>
          <section>
            <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-4 md:gap-x-4 lg:grid-cols-5">
              {cameras.map((camera) => (
                <ProductCard
                  product={camera.attributes}
                  path="cameras"
                  imageBaseUrl={`${imageUrl}/FXDB`}
                  imageSizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                  imageStyle="scale-[.7] hover:scale-75"
                  key={camera.attributes.slug}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cameras = await getAllCameras();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      cameras: cameras.data,
      imageUrl,
    },
    revalidate: 10,
  };
};
