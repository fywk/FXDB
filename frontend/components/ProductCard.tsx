import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { dateFormatter } from "../lib/util";

interface ProductCardProps {
  product: any;
  path: string;
  imageStyle?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  path,
  imageStyle,
}) => {
  const productUrl = `/${path}/${product.slug}`;
  const image =
    product.images.data.length !== 0 ? product.images.data[0].attributes : null;
  const megapixels =
    path === "cameras"
      ? Math.round((product.resolutionX * product.resolutionY) / 1000000)
      : null;
  let sensorSize = path === "cameras" ? product.sensorSize : null;
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
        <a
          className="relative w-full aspect-square bg-gray-200 dark:bg-gray-300 rounded-lg"
          title={product.name}
        >
          {image && (
            <Image
              src={image.url}
              alt={image.alternativeText}
              layout="fill"
              objectFit="scale-down"
              sizes="(min-width: 768px) 25vw, 50vw"
              placeholder="blur"
              blurDataURL={`/_next/image?url=${image.url}&w=16&q=1`}
              className={clsx("duration-300", imageStyle)}
            />
          )}
        </a>
      </Link>
      <div className="flex flex-col space-y-px w-[99%] mx-auto">
        <h2 className="text-[15px] text-fxdb font-medium leading-tight hover:underline">
          <Link href={productUrl}>
            <a title={product.name}>{product.name}</a>
          </Link>
        </h2>
        <p className="text-sm text-highlight">
          {megapixels && sensorSize && (
            <>{`${megapixels} MP / ${sensorSize}`}</>
          )}
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
