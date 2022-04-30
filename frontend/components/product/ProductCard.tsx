import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import useSWR from "swr";

import { ChevronRightIcon } from "@heroicons/react/outline";

import { ProductCardProps, Views } from "../../lib/types";
import fetcher from "../../lib/utils/fetcher";
import { convertToMP } from "../../lib/utils/unitConversion";

const ProductCard = ({
  index,
  type,
  product,
  path,
  imageBaseUrl,
  imageSizes,
  imageStyle,
}: ProductCardProps) => {
  const [active, setActive] = useState(false);
  const isHome = useRouter().pathname === "/";

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
      product.sensorSize === "APSC"
        ? "APS-C"
        : product.sensorSize === "mediumFormat" && "Medium Format";
  }

  if (path === "lenses") {
    var lensMount = product.mount.data.attributes.name;
    var focalLength = Array.isArray(product.focalLength)
      ? `${product.focalLength.join("-")}mm`
      : `${product.focalLength}mm`;
  }

  // Grid Card
  if (type === "grid") {
    return (
      <div
        className={clsx(
          isHome && "last:hidden lg:last:flex",
          "flex flex-col space-y-3"
        )}
      >
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
          <h2 className="text-fxdb font-medium leading-tight tracking-tight md:tracking-normal">
            <Link href={productUrl}>
              <a className="underline-offset-1 hover:underline">
                {path === "cameras" ? `${brand} ${product.name}` : product.name}
              </a>
            </Link>
          </h2>
          <p className="text-brightess text-sm">
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
    return (
      <Link href={productUrl}>
        <a
          className={clsx(
            active && "bg-gray-100 dark:bg-gray-800",
            "flex cursor-pointer items-center justify-between space-x-1.5 px-5 py-2 sm:space-x-2 sm:px-8"
          )}
          onClick={() => setActive(!active)}
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
              <h2 className="text-fxdb w-fit font-medium leading-tight tracking-tight underline-offset-1 hover:underline">
                {path === "cameras" ? `${brand} ${product.name}` : product.name}
              </h2>
              <p className="text-brightess text-sm">
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
            <ChevronRightIcon className="text-fxdb h-5 w-5" />
          </div>
        </a>
      </Link>
    );
  }

  // Table Row Card (Cameras)
  if (type === "table-row" && path === "cameras") {
    return (
      <TableRow>
        <TableCell type="header">{index}</TableCell>
        <TableCell type="data">
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
                <h2 className="text-fxdb truncate text-base font-medium leading-tight underline-offset-1 hover:underline">
                  {product.name}
                </h2>
                <p>{brand}</p>
              </div>
            </a>
          </Link>
        </TableCell>
        <TableCell
          type="data"
          className="text-center"
        >{`${megapixels} MP`}</TableCell>
        <TableCell type="data" className="text-center">
          {sensorSize}
        </TableCell>
        <TableCell type="data" className="text-center">
          <time dateTime={product.launchDate}>
            {format(launchDate, "dd MMM y")}
          </time>
        </TableCell>
        <TableCell type="data" className="text-center">
          <TotalViews productUrl={productUrl} />
        </TableCell>
      </TableRow>
    );
  }

  // Table Row Card (Lenses)
  if (type === "table-row" && path === "lenses") {
    return (
      <TableRow>
        <TableCell type="header">{index}</TableCell>
        <TableCell type="data">
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
                <h2 className="text-fxdb truncate text-base font-medium leading-tight underline-offset-1 hover:underline">
                  {product.name}
                </h2>
                <p>{brand}</p>
              </div>
            </a>
          </Link>
        </TableCell>
        <TableCell type="data" className="text-center">
          {focalLength}
        </TableCell>
        <TableCell type="data" className="text-center">
          {lensMount}
        </TableCell>
        <TableCell type="data" className="text-center">
          <time dateTime={product.launchDate}>
            {format(launchDate, "dd MMM y")}
          </time>
        </TableCell>
        <TableCell type="data" className="text-center">
          <TotalViews productUrl={productUrl} />
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
  type: "header" | "data";
  className?: string;
  children: ReactNode;
}) => {
  switch (type) {
    case "header":
      return <th className={clsx("p-2", className)}>{children}</th>;
    case "data":
      return <td className={clsx("p-2", className)}>{children}</td>;
  }
};

const TotalViews = ({ productUrl }: { productUrl: string }) => {
  const { data } = useSWR<Views>(`/api/views/${productUrl}`, fetcher);
  const views = data?.views;

  return <>{views > 0 ? views.toLocaleString() : "---"}</>;
};

export default ProductCard;
