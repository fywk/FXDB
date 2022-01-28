import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function ProductCard({ product, path, customImageClass }) {
  const productUrl = `/${path}/${product.slug}`;
  const image =
    product.images !== null ? product.images.data[0].attributes : null;
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const launchDate = new Date(product.launchDate);

  return (
    <div className="flex flex-col space-y-3">
      <Link href={productUrl}>
        <a
          className="relative w-full aspect-square bg-gray-200 dark:bg-gray-300 rounded-md"
          title={product.name}
        >
          {image && (
            <Image
              src={image.url}
              alt={image.alternativeText}
              layout="fill"
              objectFit="scale-down"
              sizes="(min-width: 768px) 33vw, 50vw"
              className={clsx(
                "scale-90 hover:scale-95 duration-300",
                customImageClass
              )}
            />
          )}
        </a>
      </Link>
      <div className="flex flex-col space-y-0.5 w-[99%] mx-auto">
        <h3 className="text-sm">
          {`${product.brand.data.attributes.name} / ${product.mount.data.attributes.name}`}
        </h3>
        <h2 className="text-[15px] text-fxdb font-medium leading-snug hover:underline">
          <Link href={productUrl}>
            <a title={product.name}>{product.name}</a>
          </Link>
        </h2>
        <p className="text-xs tracking-tight">
          {`Launched ${dateFormatter.format(launchDate)}`}
        </p>
      </div>
    </div>
  );
}
