import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { dateFormatter, convertToMP } from "../lib/util";

interface ProductCardProps {
  product: any;
  path: string;
  imageBaseUrl: string;
  imageStyle?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  path,
  imageBaseUrl,
  imageStyle,
}) => {
  const productUrl = `/${path}/${product.slug}`;
  const image =
    product.images.data.length !== 0 ? product.images.data[0].attributes : null;
  const imageSrc = `${imageBaseUrl}/${image.hash}${image.ext}`;
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
              sizes="(min-width: 768px) 25vw, 50vw"
              className={clsx("origin-center duration-300", imageStyle)}
            />
          )}
        </a>
      </Link>
      <div className="mx-auto flex w-[99%] flex-col space-y-px">
        <h2 className="text-fxdb font-semibold leading-tight hover:underline md:underline-offset-1">
          <Link href={productUrl}>
            <a>{product.name}</a>
          </Link>
        </h2>
        <p className="text-highlight text-sm">
          {megapixels && sensorSize && <>{`${megapixels} / ${sensorSize}`}</>}
          {brand && <>{`${brand} / ${product.mount.data.attributes.name}`}</>}
        </p>
        <p className="text-xs tracking-tight">
          {`Launched ${dateFormatter.format(launchDate)}`}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
