import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { ChevronRightIcon, SearchIcon } from "@heroicons/react/outline";

import ProductCard from "../components/ProductCard";
import { getLatestCameras, getLatestLenses } from "../lib/strapi/api";

export default function Home({ cameras, lenses, imageUrl }) {
  const { t, lang } = useTranslation("home");

  return (
    <div className="grid grid-cols-1 gap-y-14 py-14">
      <section className="grid grid-cols-1 justify-items-center gap-y-8">
        <div className="grid grid-cols-1 gap-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto text-lg font-medium leading-relaxed">
            {t("description")}
          </p>
        </div>
        <SearchBar placeholder={t("search-placeholder")} />
      </section>
      <section className="grid grid-cols-1 gap-y-12">
        <div className="flex flex-col space-y-3.5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold md:text-[22px]">
              {t("latest-cameras")}
            </h1>
            <ViewMoreLink
              href="/cameras"
              text={t("view-more")}
              title={t("view-more-cameras")}
            />
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
        <div className="flex flex-col space-y-3.5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold md:text-[22px]">
              {t("latest-lenses")}
            </h1>
            <ViewMoreLink
              href="/lenses"
              text={t("view-more")}
              title={t("view-more-lenses")}
            />
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
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const latestCameras = await getLatestCameras();
  const latestLenses = await getLatestLenses();
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

function SearchBar({ placeholder }) {
  return (
    <button
      type="button"
      className="group mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-white px-5 py-3.5 ring-1 ring-gray-300 hover:ring-2 active:ring-gray-400 dark:bg-gray-700/75 dark:ring-0 dark:hover:bg-gray-700 dark:hover:ring-0"
    >
      <div className="text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300">
        {placeholder}
      </div>
      <div className="group-hover:text-gray-700 dark:group-hover:text-gray-300">
        <SearchIcon className="stroke-2.25 h-5.5 w-5.5" />
      </div>
    </button>
  );
}

function ViewMoreLink({ href, text, ...attr }) {
  return (
    <div className="hover:text-link flex items-center space-x-1">
      <Link href={href}>
        <a className="text-xs font-medium uppercase" {...attr}>
          {text}
        </a>
      </Link>
      <ChevronRightIcon className="stroke-3 h-4 w-4" />
    </div>
  );
}
