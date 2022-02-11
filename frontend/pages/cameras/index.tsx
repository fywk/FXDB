import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import ProductCard from "../../components/ProductCard";

export default function CamerasPage({ cameras, imageUrl }) {
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:gap-x-5">
              {cameras.map((camera, i) => (
                <ProductCard
                  product={camera.attributes}
                  path="cameras"
                  imageBaseUrl={`${imageUrl}/FXDB`}
                  imageStyle="scale-[.7] hover:scale-75"
                  key={i}
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
  const res = await fetch(
    "https://fxdb-backend.herokuapp.com/api/cameras?populate=*&sort=launchDate:desc"
  );
  const cameras = await res.json();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      cameras: cameras.data,
      imageUrl,
    },
    revalidate: 10,
  };
};
