import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "../../lib/types";
import { convertToMP } from "../../lib/utils/convertToMP";
import { humanizeLensMount } from "../../lib/utils/humanizeLensMount";

const ProductCard = ({
  product,
  path,
  imageBaseUrl,
  imageSizes,
  imageStyle,
}: ProductCard) => {
  const productUrl = `/${path}/${product.slug}`;
  const image =
    product.images.data?.length > 0 ? product.images.data[0].attributes : null;
  const imageSrc = `${imageBaseUrl}/${image?.hash}${image?.ext}`;
  const megapixels =
    path === "cameras"
      ? convertToMP(product.resolutionX, product.resolutionY)
      : null;
  let sensorSize: string = path === "cameras" ? product.sensorSize : null;
  if (sensorSize !== null) {
    if (sensorSize === "APSC") {
      sensorSize = "APS-C";
    } else if (sensorSize === "mediumFormat") {
      sensorSize = "Medium Format";
    }
  }
  const brand = path === "lenses" ? product.brand.data.attributes.name : null;
  const lensMount = humanizeLensMount(product.mount?.data?.attributes.name);
  const launchDate = new Date(product.launchDate);

  return (
    <div className="flex flex-col space-y-3">
      <Link href={productUrl}>
        <a className="relative aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-300">
          {image && (
            <Image
              src={imageSrc}
              alt={image.alternativeText}
              layout="fill"
              objectFit="scale-down"
              sizes={imageSizes}
              className={clsx("origin-center duration-300", imageStyle)}
            />
          )}
        </a>
      </Link>
      <div className="mx-auto flex w-[99%] flex-col space-y-0.5">
        <h2 className="text-fxdb font-semibold leading-tight">
          <Link href={productUrl}>
            <a className="hover:underline md:underline-offset-1">
              {product.name}
            </a>
          </Link>
        </h2>
        <p className="text-highlight text-sm">
          {megapixels && sensorSize && `${megapixels} MP / ${sensorSize}`}
          {brand && product.mount.data && `${brand} / ${lensMount}`}
        </p>
        <p className="text-xs tracking-tight">
          {"Announced "}
          <time dateTime={product.launchDate}>
            {format(launchDate, "dd MMM y")}
          </time>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
