import { useRouter } from "next/router";

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ExternalLinkIcon
} from "@heroicons/react/outline";

import { Product } from "../lib/types";
import CameraSpecs from "./CameraSpecs";
import LensSpecs from "./LensSpecs";
import ProductImages from "./ProductImages";
import ProductStats from "./ProductStats";

const ProductDetails = (props: Product) => {
  const router = useRouter();
  const goBack = () => router.back();

  const cameraFootnotes = [
    {
      id: 1,
      content:
        "Maximum shutter speed of mechanical shutter. Faster shutter speeds could be achieved using electronic shutter.",
    },
    {
      id: 2,
      content: "Including the weight of battery and memory card.",
    },
  ];
  const lensFootnotes = [
    {
      id: 1,
      content:
        "Excluding the weight of lens cap, lens hood, or any other accessories.",
    },
  ];

  return (
    <>
      <div className="hidden md:block md:py-5">
        <button
          type="button"
          onClick={goBack}
          className="text-fxdb group items-center space-x-1.5 md:flex md:print:hidden"
        >
          <ChevronLeftIcon className="stroke-3 h-4.5 w-4.5 duration-300 group-hover:-translate-x-1" />
          <span className="text-inherit">Back</span>
        </button>
      </div>
      <div className="flex flex-col space-y-10">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-11 md:gap-7 lg:gap-9">
          <div className="full-width md:full-width-reset md:col-span-5">
            <div className="static">
              <button
                type="button"
                onClick={goBack}
                className="stroke-2.5 h-7.5 w-7.5 absolute top-3.5 left-3.5 z-10 flex items-center justify-center rounded-full bg-gray-900/60 text-gray-50 shadow-md print:hidden md:hidden"
              >
                <span className="sr-only">Back</span>
                <ArrowLeftIcon className="stroke-2.5 h-4.5 w-4.5" />
              </button>
            </div>
            <div className="relative aspect-square w-full bg-gray-200 dark:bg-gray-300 md:rounded-lg">
              <ProductImages {...props} />
            </div>
          </div>
          <div className="md:col-span-6 md:py-0.5">
            <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
              <ProductStats {...props} />
              {props.type === "camera" && <CameraSpecs {...props} />}
              {props.type === "lens" && <LensSpecs {...props} />}
            </ul>
          </div>
        </section>
        {props.dataSource && (
          <section className="print:hidden">
            <a
              href={props.dataSource}
              className="bg-primary/5 dark:bg-secondary/5 text-fxdb hover:bg-primary/10 dark:hover:bg-secondary/10 px-4.5 flex w-full items-center justify-between rounded-lg py-3 text-center md:max-w-xs md:py-2.5"
              title={new URL(props.dataSource).hostname}
              rel="noopener noreferrer"
            >
              <span>Data Source</span>
              <ExternalLinkIcon className="h-5 w-5" />
            </a>
          </section>
        )}
        <section className="pb-5">
          {props.type === "camera" && <Footnotes notes={cameraFootnotes} />}
          {props.type === "lens" && <Footnotes notes={lensFootnotes} />}
        </section>
      </div>
    </>
  );
};

function Footnotes({ notes }) {
  return (
    <ol className="ml-5 list-decimal space-y-1 text-xs">
      {notes.map((note) => (
        <li className="pl-0.5" key={note.id}>{`${note.content}`}</li>
      ))}
    </ol>
  );
}

export default ProductDetails;
