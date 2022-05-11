import Link from "next/link";
import useSWR from "swr";

import fetcher from "../lib/utils/fetcher";

const TopProducts = ({ cameras, lenses }) => {
  const { data: topCameras } = useSWR<any>("/api/views/cameras", fetcher);
  const { data: topLenses } = useSWR<any>("/api/views/lenses", fetcher);

  return (
    <div className="mt-10 grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-10 lg:mt-12">
      <TopSection
        title="Top Cameras"
        category="cameras"
        products={cameras}
        topProducts={topCameras?.views}
      />
      <TopSection
        title="Top Lenses"
        category="lenses"
        products={lenses}
        topProducts={topLenses?.views}
      />
    </div>
  );
};

const TopSection = ({ title, category, products, topProducts }) => {
  return (
    <section>
      <h2 className="mb-2.5 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="divide-y divide-gray-200/75 dark:divide-gray-800/75">
        {!topProducts
          ? [...Array(5)].map((_, i) => (
              <TopProductSkeleton ranking={i + 1} key={i} />
            ))
          : products.data
              .filter(({ attributes }) =>
                Object.keys(topProducts).includes(attributes.slug)
              )
              .sort(
                (a, b) =>
                  topProducts[b.attributes.slug] -
                  topProducts[a.attributes.slug]
              )
              .map(({ attributes }, i: number) => (
                <TopProduct
                  ranking={i + 1}
                  product={attributes}
                  category={category}
                  views={topProducts[attributes.slug]}
                  key={i}
                />
              ))}
      </div>
    </section>
  );
};

const TopProduct = ({ product, ranking, category, views }) => {
  const brand = product.brand ? product.brand.data.attributes.name : "Fujifilm";

  return (
    <div className="flex h-[3.75rem] items-center px-2.5 md:h-16 lg:h-[4.25rem]">
      <div className="flex w-full items-center justify-between gap-x-5">
        <div className="w-6 text-center text-sm">{ranking}</div>
        <div className="text-fxdb w-full truncate leading-tight">
          <Link href={`/${category}/${product.slug}`}>
            <a
              className="font-medium hover:underline"
              title={`${brand} ${product.name}`}
            >
              {product.name}
            </a>
          </Link>
          <div className="text-brighter text-sm">{brand}</div>
        </div>
        <div className="whitespace-nowrap text-[15px]">
          {`${views.toLocaleString()} views`}
        </div>
      </div>
    </div>
  );
};

const TopProductSkeleton = ({ ranking }) => {
  return (
    <div className="flex h-[3.75rem] items-center px-2.5 md:h-16 lg:h-[4.25rem]">
      <div className="flex w-full items-center justify-between gap-x-5">
        <div className="w-6 text-center text-sm">{ranking}</div>
        <div className="flex w-full flex-col gap-y-2">
          <div className="h-3.5 w-full rounded-full bg-gray-200/75 dark:bg-gray-800/75"></div>
          <div className="h-3 w-[55%] rounded-full bg-gray-200/75 dark:bg-gray-800/75"></div>
        </div>
        <div className="h-3 w-1/4 rounded-full bg-gray-200/75 dark:bg-gray-800/75"></div>
      </div>
    </div>
  );
};

export default TopProducts;
