import Link from "next/link";
import { GetStaticProps } from "next";
import { ChevronRightIcon, SearchIcon } from "@heroicons/react/outline";
import ProductCard from "../components/ProductCard";
import { getLatestCameras, getLatestLenses } from "../lib/strapi/api";

export default function Home({ cameras, lenses, imageUrl }) {
  return (
    <div className="grid grid-cols-1 py-16">
      <section className="grid grid-cols-1 justify-items-center mb-12">
        <div className="grid grid-cols-1 gap-y-6 mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Fujifilm X and GFX Database
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            <strong className="text-highlight">FXDB</strong> is a database of
            cameras and lenses made for Fujifilm X and GFX systems. You can find
            relevant specifications for each product including products from
            third-party manufacturers.
          </p>
        </div>
        <SearchBar />
      </section>
      <section className="grid grid-cols-1 gap-y-12">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-bold">Latest Cameras</h1>
            <ViewMoreLink href="/cameras" title="View all cameras" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 lg:gap-x-5">
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
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-bold">Latest Lenses</h1>
            <ViewMoreLink href="/lenses" title="View all lenses" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 lg:gap-x-5">
            {lenses.map((lens, i) => (
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
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const latestCameras = await getLatestCameras();
  const latestLenses = await getLatestLenses();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      cameras: latestCameras.data,
      lenses: latestLenses.data,
      imageUrl,
    },
    revalidate: 10,
  };
};

function SearchBar() {
  return (
    <button
      type="button"
      className="group flex items-center justify-between w-full max-w-4xl bg-white dark:bg-gray-700/75 dark:hover:bg-gray-700 mx-auto px-5 py-3 ring-1 dark:ring-0 hover:ring-2 dark:hover:ring-0 ring-gray-300 active:ring-gray-400 rounded-full"
    >
      <div className="text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300">
        Search for a camera, lens, brand...
      </div>
      <div className="group-hover:text-gray-700 dark:group-hover:text-gray-300">
        <SearchIcon className="h-5.5 w-5.5" />
      </div>
    </button>
  );
}

function ViewMoreLink({ href, ...attr }) {
  return (
    <div className="flex items-center space-x-0.5 hover:text-link">
      <Link href={href}>
        <a className="text-xs font-medium uppercase" {...attr}>
          View all
        </a>
      </Link>
      <ChevronRightIcon className="h-4 w-4" />
    </div>
  );
}
