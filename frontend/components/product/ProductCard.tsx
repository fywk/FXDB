import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/outline";

import { ProductCardProps } from "../../lib/types";
import { convertToMP } from "../../lib/utils/convertToMP";
import { humanizeLensMount } from "../../lib/utils/humanizeLensMount";
import ViewCounter from "../ViewCounter";

const ProductCard = ({
  index,
  type,
  product,
  path,
  imageBaseUrl,
  imageSizes,
  imageStyle,
}: ProductCardProps) => {
  const productUrl = `/${path}/${product.slug}`;
  const image =
    product.images.data?.length > 0 ? product.images.data[0].attributes : null;
  const imageSrc = `${imageBaseUrl}/${image?.hash}${image?.ext}`;
  const brand =
    path === "lenses" ? product.brand.data.attributes.name : "Fujifilm";
  const launchDate = new Date(product.launchDate);

  if (path === "cameras") {
    var megapixels = convertToMP(product.resolutionX, product.resolutionY);
    var sensorSize =
      sensorSize === "APSC"
        ? "APS-C"
        : sensorSize === "mediumFormat" && "Medium Format";
  }

  if (path === "lenses") {
    var lensMount = humanizeLensMount(product.mount?.data?.attributes.name);
    var focalLength = Array.isArray(product.focalLength)
      ? `${product.focalLength.join("-")}mm`
      : `${product.focalLength}mm`;
  }

  // Grid Card
  if (type === "grid") {
    return (
      <div className="flex flex-col space-y-3.5">
        <Link href={productUrl}>
          <a className="relative aspect-square w-full rounded-md bg-gray-200 dark:bg-gray-300">
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
          <h2 className="text-fxdb font-medium leading-tight">
            <Link href={productUrl}>
              <a className="hover:underline md:underline-offset-1">
                {path === "cameras" ? `${brand} ${product.name}` : product.name}
              </a>
            </Link>
          </h2>
          <p className="text-highlight text-sm">
            {path === "cameras" && `${megapixels} MP / ${sensorSize}`}
            {path === "lenses" && `${brand} / ${lensMount}`}
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
  }

  // List Card
  if (type === "list") {
    const [active, setActive] = useState(false);
    const toggleClass = () => setActive(!active);
    return (
      <Link href={productUrl}>
        <a
          className={clsx(
            active && "bg-gray-100 dark:bg-gray-800",
            "flex cursor-pointer items-center justify-between space-x-1.5 px-5 py-2 sm:space-x-2 sm:px-8"
          )}
          onClick={toggleClass}
        >
          <div className="grid w-full grid-cols-4 gap-x-3 sm:gap-x-3.5">
            <div className="relative aspect-square w-full rounded-md bg-gray-200 dark:bg-gray-300">
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
            </div>
            <div className="col-span-3 flex w-full flex-col space-y-0.5 sm:py-0.5">
              <h2 className="text-fxdb w-fit text-base font-medium leading-tight underline-offset-1 hover:underline">
                {path === "cameras" ? `${brand} ${product.name}` : product.name}
              </h2>
              <p className="text-highlight text-sm">
                {path === "cameras" && `${megapixels} MP / ${sensorSize}`}
                {path === "lenses" && `${brand} / ${lensMount}`}
              </p>
              <p className="text-xs tracking-tight">
                {"Announced "}
                <time dateTime={product.launchDate}>
                  {format(launchDate, "dd MMM y")}
                </time>
              </p>
            </div>
          </div>
          <div>
            <ChevronRightIcon className="text-fxdb h-5 w-5 stroke-2.25" />
          </div>
        </a>
      </Link>
    );
  }

  // Table Row Card (Cameras)
  if (type === "table-row" && path === "cameras") {
    return (
      <TableRow>
        <TableCell type="th">{index}</TableCell>
        <TableCell type="td">
          <Link href={productUrl}>
            <a className="flex w-fit items-center space-x-3.5">
              <div className="relative aspect-square w-12 rounded-md bg-gray-200 dark:bg-gray-300">
                {image && (
                  <Image
                    src={imageSrc}
                    alt={image.alternativeText}
                    layout="fill"
                    objectFit="scale-down"
                    sizes={imageSizes}
                    className={imageStyle}
                  />
                )}
              </div>
              <div className="max-w-[18rem] tracking-normal">
                <h2 className="text-fxdb truncate text-base leading-tight underline-offset-1 hover:underline">
                  {product.name}
                </h2>
                <p>{brand}</p>
              </div>
            </a>
          </Link>
        </TableCell>
        <TableCell
          type="td"
          className="text-center"
        >{`${megapixels} MP`}</TableCell>
        <TableCell type="td" className="text-center">
          {sensorSize}
        </TableCell>
        <TableCell type="td" className="text-center">
          <time dateTime={product.launchDate}>
            {format(launchDate, "dd MMM y")}
          </time>
        </TableCell>
        <TableCell type="td" className="text-center">
          <ViewCounter path={path} slug={product.slug} />
        </TableCell>
      </TableRow>
    );
  }

  // Table Row Card (Lenses)
  if (type === "table-row" && path === "lenses") {
    return (
      <TableRow>
        <TableCell type="th">{index}</TableCell>
        <TableCell type="td">
          <Link href={productUrl}>
            <a className="flex w-fit items-center space-x-3.5">
              <div className="relative aspect-square w-12 rounded-md bg-gray-200 dark:bg-gray-300">
                {image && (
                  <Image
                    src={imageSrc}
                    alt={image.alternativeText}
                    layout="fill"
                    objectFit="scale-down"
                    sizes={imageSizes}
                    className={imageStyle}
                  />
                )}
              </div>
              <div className="max-w-[18rem] tracking-normal">
                <h2 className="text-fxdb truncate text-base leading-tight underline-offset-1 hover:underline">
                  {product.name}
                </h2>
                <p>{brand}</p>
              </div>
            </a>
          </Link>
        </TableCell>
        <TableCell type="td" className="text-center">
          {focalLength}
        </TableCell>
        <TableCell type="td" className="text-center">
          {lensMount}
        </TableCell>
        <TableCell type="td" className="text-center">
          <time dateTime={product.launchDate}>
            {format(launchDate, "dd MMM y")}
          </time>
        </TableCell>
        <TableCell type="td" className="text-center">
          <ViewCounter path={path} slug={product.slug} />
        </TableCell>
      </TableRow>
    );
  }
};

const TableRow = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800/50">{children}</tr>
  );
};

const TableCell = ({
  type,
  className,
  children,
}: {
  type: "th" | "td";
  className?: string;
  children: ReactNode;
}) => {
  switch (type) {
    case "th":
      return <th className={clsx("p-2", className)}>{children}</th>;
    case "td":
      return <td className={clsx("p-2", className)}>{children}</td>;
  }
};

export default ProductCard;
