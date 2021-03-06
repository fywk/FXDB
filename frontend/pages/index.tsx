import { GetStaticProps } from "next";
import Link from "next/link";

import { SearchIcon } from "@heroicons/react/solid";

import ProductCard from "../components/product/ProductCard";
import { siteConfig } from "../lib/config/site";
import { getLatestCameras } from "../lib/strapi/cameras";
import { getLatestLenses } from "../lib/strapi/lenses";
import { Product } from "../lib/types";

const Home = ({ cameras, lenses, imageUrl }) => {
  const { title, description } = siteConfig;

  return (
    <div className="grid grid-cols-1 gap-y-10 py-10">
      <section className="grid grid-cols-1 justify-items-center gap-y-7 py-1 sm:py-2 md:py-3 lg:py-4">
        <div className="grid grid-cols-1 gap-y-5 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto max-w-4xl text-lg font-medium leading-relaxed">
            {description}
          </p>
        </div>
        <button
          type="button"
          className="group mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-white px-5 py-3.5 ring-1 ring-gray-300 hover:ring-2 active:ring-primary/75 dark:bg-gray-700/75 dark:ring-0 dark:hover:bg-gray-700 dark:hover:ring-0"
        >
          <div className="text-sm">Search for a camera, lens, brand...</div>
          <SearchIcon className="h-5.5 w-5.5" />
        </button>
      </section>
      <div className="grid grid-cols-1">
        <ProductSection
          heading="Latest Cameras"
          section="cameras"
          products={cameras}
          imageUrl={`${imageUrl}/FXDB`}
          imageStyle="scale-[.7] hover:scale-75"
        />
      </div>
      <div className="grid grid-cols-1">
        <ProductSection
          heading="Latest Lenses"
          section="lenses"
          products={lenses}
          imageUrl={`${imageUrl}/t_rotate_lens_270deg/FXDB`}
          imageStyle="scale-[.85] hover:scale-90"
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const latestCameras: Product[] = await getLatestCameras();
  const latestLenses: Product[] = await getLatestLenses();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      cameras: latestCameras,
      lenses: latestLenses,
      imageUrl,
    },
    revalidate: 10,
  };
};

function ProductSection({
  heading,
  section,
  products,
  imageUrl,
  imageStyle,
}: {
  heading: string;
  section: string;
  products: any;
  imageUrl: string;
  imageStyle: string;
}) {
  return (
    <section className="flex flex-col space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[22px] font-bold tracking-tight md:text-2xl">
          {heading}
        </h2>
        <div className="text-xs font-bold uppercase tracking-wider">
          <Link href={`/${section}`}>
            <a className="hover:text-link">See all</a>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-4.5 sm:gap-y-5.5 md:grid-cols-4 md:gap-x-5 md:gap-y-6 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-7">
        {products.data.map((product) => (
          <ProductCard
            type="grid"
            product={product.attributes}
            path={section}
            imageBaseUrl={imageUrl}
            imageSizes="(min-width: 768px) 25vw, 50vw"
            imageStyle={imageStyle}
            key={product.attributes.slug}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
