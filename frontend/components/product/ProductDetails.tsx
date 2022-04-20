import { useRouter } from "next/router";

import { ChevronLeftIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/solid";

import { Product } from "../../lib/types";
import CameraSpecs from "./CameraSpecs";
import LensSpecs from "./LensSpecs";
import ProductImages from "./ProductImages";
import ProductStats from "./ProductStats";

export default function ProductDetails({
  footnotes,
  ...props
}: { footnotes: { id: number; content: string }[] } & Product) {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <>
      <div className="hidden md:block md:py-5">
        <button
          type="button"
          onClick={goBack}
          className="text-fxdb group items-center space-x-1.5 font-medium md:flex md:print:hidden"
        >
          <ChevronLeftIcon className="h-4.5 w-4.5 stroke-3 duration-300 group-hover:-translate-x-1" />
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
                className="absolute top-3.5 left-3.5 z-10 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-900/60 stroke-2.5 text-gray-50 shadow-md print:hidden md:hidden"
              >
                <span className="sr-only">Back</span>
                <ArrowLeftIcon className="h-4.5 w-4.5" />
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
              className="text-fxdb flex w-full items-center justify-between rounded-lg bg-primary/5 px-4.5 py-3 text-center font-medium hover:bg-primary/10 dark:bg-secondary/5 dark:hover:bg-secondary/10 md:max-w-xs md:py-2.5"
              title={new URL(props.dataSource).hostname}
              rel="noopener noreferrer"
            >
              <span>Data Source</span>
              <ExternalLinkIcon className="h-5 w-5 stroke-2.25" />
            </a>
          </section>
        )}
        <section className="pb-5">
          {footnotes && <Footnotes notes={footnotes} />}
        </section>
      </div>
    </>
  );
}

function Footnotes({ notes }) {
  return (
    <ol className="ml-5 list-decimal space-y-1.5 text-xs">
      {notes.map((note) => (
        <li className="pl-0.5" key={note.id}>{`${note.content}`}</li>
      ))}
    </ol>
  );
}
