import { GetStaticProps } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import { ChevronRightIcon, SearchIcon } from "@heroicons/react/outline";
import SiteTotalViews from "../components/SiteTotalViews";
import ProductCard from "../components/ProductCard";
import {
  getAllBrands,
  getLatestCameras,
  getLatestLenses,
} from "../lib/strapi/api";

export default function Home({ cameras, lenses, brands, imageUrl }) {
  return (
    <div className="grid grid-cols-1 gap-y-14 pt-14">
      <section className="grid grid-cols-1 justify-items-center gap-y-8">
        <div className="grid grid-cols-1 gap-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Fujifilm X and GFX Database
          </h1>
          <p className="mx-auto max-w-4xl text-lg font-medium leading-relaxed">
            <strong>FXDB</strong> features a vast collection of relevant
            information of cameras and lenses of the Fujifilm X and GFX systems.
            For lenses specifically, products from third-party manufacturers are
            also included.
          </p>
        </div>
        <SearchBar />
      </section>
      <section className="grid grid-cols-1 gap-y-12">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold md:text-[22px]">
              Latest Cameras
            </h1>
            <ViewMoreLink href="/cameras" title="View all cameras" />
          </div>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-4 md:gap-x-4 lg:gap-x-5">
            {cameras.data.map((camera, i) => (
              <ProductCard
                product={camera.attributes}
                path="cameras"
                imageBaseUrl={`${imageUrl}/FXDB`}
                imageStyle="scale-[.7] hover:scale-75"
                key={i}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold md:text-[22px]">
              Latest Lenses
            </h1>
            <ViewMoreLink href="/lenses" title="View all lenses" />
          </div>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-4 md:gap-x-4 lg:gap-x-5">
            {lenses.data.map((lens, i) => (
              <ProductCard
                product={lens.attributes}
                path="lenses"
                imageBaseUrl={`${imageUrl}/t_rotate_lens_270deg/FXDB`}
                imageStyle="scale-[.85] hover:scale-90"
                key={i}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col space-y-3">
        <h1 className="text-xl font-semibold md:text-[22px]">
          Site Statistics
        </h1>
        <div className="base-width lg:full-width dark:bg-secondary/5 bg-primary/5 -mx-4 py-8 sm:-mx-8 md:py-10 lg:py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-6 gap-x-3 px-4 sm:px-8 md:grid-cols-4">
            <SiteStats category="All-Time Views" data={<SiteTotalViews />} />
            <SiteStats
              category="Total Lenses"
              data={lenses.meta.pagination.total.toLocaleString()}
            />
            <SiteStats
              category="Total Cameras"
              data={cameras.meta.pagination.total.toLocaleString()}
            />
            <SiteStats
              category="Total Brands"
              data={brands.meta.pagination.total.toLocaleString()}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const latestCameras = await getLatestCameras();
  const latestLenses = await getLatestLenses();
  const allBrands = await getAllBrands();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      cameras: latestCameras,
      lenses: latestLenses,
      brands: allBrands,
      imageUrl,
    },
    revalidate: 10,
  };
};

function SearchBar() {
  return (
    <button
      type="button"
      className="group mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-white px-5 py-3 ring-1 ring-gray-300 hover:ring-2 active:ring-gray-400 dark:bg-gray-700/75 dark:ring-0 dark:hover:bg-gray-700 dark:hover:ring-0"
    >
      <div className="text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300">
        Search for a camera, lens, brand...
      </div>
      <div className="group-hover:text-gray-700 dark:group-hover:text-gray-300">
        <SearchIcon className="stroke-2.25 h-5.5 w-5.5" />
      </div>
    </button>
  );
}

function ViewMoreLink({ href, ...attr }) {
  return (
    <div className="hover:text-link flex items-center space-x-0.5">
      <Link href={href}>
        <a className="text-xs font-medium uppercase" {...attr}>
          View all
        </a>
      </Link>
      <ChevronRightIcon className="stroke-3 h-4 w-4" />
    </div>
  );
}

function SiteStats({
  category,
  data,
}: {
  category: string;
  data: number | ReactElement;
}) {
  return (
    <div className="w-full text-center md:space-y-0.5">
      <p className="text-fxdb text-4xl font-bold">{data}</p>
      <p className="text-sm">{category}</p>
    </div>
  );
}
