import { GetStaticProps } from "next";
import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

import ProductCard from "../components/product/ProductCard";
import { siteConfig } from "../lib/config/site";
import { getLatestCameras } from "../lib/strapi/cameras";
import { getLatestLenses } from "../lib/strapi/lenses";
import { Product } from "../lib/types";

const Home = ({ cameras, lenses, imageUrl }) => {
  const { title, description } = siteConfig;

  return (
    <div className="grid grid-cols-1 gap-y-14 py-14">
      <section className="grid grid-cols-1 justify-items-center gap-y-8">
        <div className="grid grid-cols-1 gap-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
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
      <div className="grid grid-cols-1 gap-y-12">
        <ProductSection
          heading="Latest Cameras"
          section="cameras"
          products={cameras}
          imageUrl={`${imageUrl}/FXDB`}
          imageStyle="scale-[.7] hover:scale-75"
        />
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
    <section className="flex flex-col space-y-3.5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-[22px]">{heading}</h1>
        <div className="hover:text-link flex items-center space-x-1">
          <Link href={`/${section}`}>
            <a className="text-sm tracking-tight">More {section}</a>
          </Link>
          <ChevronRightIcon className="h-4 w-4 stroke-3.25" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-4 md:gap-x-7">
        {products.data.map((product) => (
          <ProductCard
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
