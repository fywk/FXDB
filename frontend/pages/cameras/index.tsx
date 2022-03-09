import "../../lib/utils/removePunctuationSpaces.ts";

import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";

import { SearchIcon, XIcon } from "@heroicons/react/outline";

import Meta from "../../components/Meta";
import ProductCard from "../../components/product/ProductCard";
import { getAllCameras } from "../../lib/strapi/cameras";
import { dateFormatter } from "../../lib/utils/dateFormatter";

export default function Cameras({ cameras, imageUrl }) {
  const numOfCameras = cameras.length;
  const firstCamera = cameras[numOfCameras - 1].attributes;
  const latestCamera = cameras[0].attributes;

  const [searchValue, setSearchValue] = useState("");
  const filteredResults = cameras.filter((camera) => {
    if (!searchValue) {
      return camera;
    } else if (
      String(camera.attributes.name)
        .toLowerCase()
        .removePunctuationSpaces()
        .includes(searchValue.toLowerCase().removePunctuationSpaces())
    ) {
      return camera;
    }
  });

  return (
    <>
      <Meta title="Cameras" />
      <div className="min-h-screen py-8">
        <div className="flex flex-col space-y-8">
          <section>
            <h1 className="mb-3 text-4xl font-bold">Cameras</h1>
            <p className="mb-4 leading-[1.7]">
              {`Fujifilm has released a total of ${numOfCameras} cameras on both the X and GFX series since the introduction of the first X Series camera, the `}
              <Link href={`/cameras/${firstCamera.slug}`}>
                <a className="hover:underline">{firstCamera.name}</a>
              </Link>
              {`, back in the year ${new Date(
                firstCamera.launchDate
              ).getFullYear()}. The `}
              <Link href={`/cameras/${latestCamera.slug}`}>
                <a className="hover:underline">{latestCamera.name}</a>
              </Link>
              {` is the newest camera to be released, on `}
              <time dateTime={latestCamera.launchDate}>
                {dateFormatter("long").format(
                  new Date(latestCamera.launchDate)
                )}
              </time>
              {`.`}
            </p>
            <form className="group relative">
              <label htmlFor="search">
                <SearchIcon className="absolute inset-y-0 left-4 m-auto h-5 w-5" />
              </label>
              <input
                id="search"
                type="text"
                value={searchValue}
                aria-label={`Search all ${numOfCameras} cameras`}
                placeholder={`Search all ${numOfCameras} cameras`}
                onChange={(e) => setSearchValue(e.target.value)}
                className="text-highlight dark:placeholder:text-dimmed w-full rounded-lg border bg-white py-2 px-11 focus:outline-none focus:ring-2 focus:ring-primary/25 dark:border-transparent dark:bg-gray-800 dark:focus:ring-secondary/50 md:px-[2.825rem]"
              />
              {searchValue && (
                <button type="reset" onClick={() => setSearchValue("")}>
                  <XIcon className="absolute inset-y-0 right-4 m-auto -mr-1 h-6.5 w-6.5 rounded-md stroke-1.5 p-1 hover:bg-gray-100 dark:hover:bg-gray-700" />
                </button>
              )}
            </form>
          </section>
          <section>
            {filteredResults.length > 0 && (
              <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-4 md:gap-x-4.5 lg:grid-cols-5">
                {filteredResults.map((camera) => (
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
            )}
            {!filteredResults.length && (
              <div className="text-dimmed text-center">
                <p>
                  No results for "<strong>{searchValue}</strong>".
                </p>
                <p>Try again with different keywords.</p>
              </div>
            )}
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
