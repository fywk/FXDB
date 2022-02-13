import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";
import { dateFormatter } from "../lib/util";
import ViewCounter from "./ViewCounter";
import type { ReactElement } from "react";

interface CameraProps {
  cameraType?: string;
  cameraFocalLength?: string;
  resolutionX?: number;
  resolutionY?: number;
  sensorSize?: string;
  sensorType?: string;
  maxShutterSpeed?: string;
  IBIS?: boolean;
}

interface LensProps {
  brand?: string;
}

interface ProductDetailProps extends CameraProps, LensProps {
  type: "camera" | "lens";
  slug: string;
  name: string;
  launchDate: string;
  lensMount: string;
  weatherResistant: boolean;
  weight: number;
  dataSource: string;
}

const ProductDetails: React.FC<ProductDetailProps> = (props) => {
  const router = useRouter();
  const goBack = () => router.back();

  const megapixels = `${Math.round(
    (props.resolutionX * props.resolutionY) / 1_000_000
  )} MP`;

  // Convert weight from grams to ounces
  const weightOz = Math.round(props.weight * 0.03527396194958 * 100) / 100;

  return (
    <>
      <div className="hidden md:block md:py-6">
        <button
          type="button"
          onClick={goBack}
          className="text-fxdb group items-center space-x-1.5 md:flex md:print:hidden"
        >
          <ChevronLeftIcon className="stroke-2.5 h-4.5 w-4.5 duration-300 group-hover:-translate-x-1" />
          <span className="font-medium text-inherit">Back</span>
        </button>
      </div>
      <div className="flex flex-col space-y-10">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="full-width md:full-width-reset">
            <div className="static">
              <button
                type="button"
                onClick={goBack}
                className="stroke-2.5 h-7.5 w-7.5 absolute top-3.5 left-3.5 flex items-center justify-center rounded-full bg-gray-900/60 text-gray-50 shadow-md print:hidden md:hidden"
              >
                <span className="sr-only">Back</span>
                <ArrowLeftIcon className="stroke-2.25 h-4.5 w-4.5" />
              </button>
            </div>
            <div className="aspect-square w-full bg-gray-200 dark:bg-gray-300 md:rounded-lg"></div>
          </div>
          <div>
            <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
              <li className="flex flex-col space-y-4 font-sans">
                <h1 className="text-fxdb text-2xl font-bold">{props.name}</h1>
                <div className="overflow-x-auto">
                  <div className="mb-3 grid w-[21rem] min-w-full grid-cols-3 items-center justify-items-center gap-x-1.5 text-center md:mb-4 md:gap-x-2">
                    {props.resolutionX && props.resolutionY ? (
                      <StatItem title="Effective Pixels" data={megapixels} />
                    ) : (
                      <StatItem title="Brand" data={props.brand} />
                    )}
                    <StatItem
                      title="Launched"
                      data={dateFormatter.format(new Date(props.launchDate))}
                    />
                    <StatItem
                      title="Views"
                      data={
                        <ViewCounter
                          path={props.type}
                          slug={props.slug}
                          recordView
                        />
                      }
                    />
                  </div>
                </div>
              </li>
              {props.type === "camera" && (
                <ListItem title="Camera type" data={props.cameraType} />
              )}
              {props.lensMount && (
                <ListItem title="Lens mount" data={props.lensMount} />
              )}
              {props.cameraFocalLength && (
                <ListItem title="Focal length" data={props.cameraFocalLength} />
              )}
              {props.resolutionX && props.resolutionY && (
                <ListItem
                  title="Maximum resolution"
                  data={`${String(props.resolutionX)} × ${String(
                    props.resolutionY
                  )}`}
                />
              )}
              {props.sensorSize && (
                <ListItem title="Sensor size" data={props.sensorSize} />
              )}
              {props.sensorType && (
                <ListItem title="Sensor type" data={props.sensorType} />
              )}
              {props.maxShutterSpeed && (
                <ListItem
                  title="Max shutter speed"
                  data={props.maxShutterSpeed}
                  footnoteId={1}
                />
              )}
              <ListItem
                title="Weather resistant"
                data={props.weatherResistant ? "Yes" : "No"}
              />
              {props.cameraType && (
                <ListItem
                  title={
                    <span className="relative cursor-help hover:after:ml-1 hover:after:content-['(In-Body_Image_Stabilisation)']">
                      IBIS
                    </span>
                  }
                  data={props.IBIS ? "Yes" : "No"}
                />
              )}
              <ListItem
                title="Weight"
                data={`${props.weight} grams (${weightOz} ounces)`}
                footnoteId={2}
              />
            </ul>
          </div>
        </section>
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
        <section className="space-y-5 pb-5">
          <div className="h-px bg-gray-200 dark:bg-gray-800" />
          {props.type === "camera" && (
            <Footnotes
              references={[
                {
                  id: 1,
                  content:
                    "Maximum shutter speed of mechanical shutter. Faster shutter speeds could be achieved using electronic shutter.",
                },
                {
                  id: 2,
                  content: "Including the weight of battery and memory card.",
                },
              ]}
            />
          )}
        </section>
      </div>
    </>
  );
};

function StatItem({
  title,
  data,
}: {
  title: string;
  data: string | ReactElement;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs leading-snug">{title}</p>
      <p className="text-highlight text-lg font-semibold leading-snug lg:text-xl">
        {data}
      </p>
    </div>
  );
}

function ListItem({
  title,
  data,
  footnoteId,
}: {
  title: string | ReactElement;
  data: string;
  footnoteId?: number;
}) {
  return (
    <li>
      <div className="mx-auto flex w-[99%] flex-wrap items-center justify-between leading-[3rem]">
        <div className="leading-inherit text-sm uppercase lg:text-[15px]">
          {title}
          {footnoteId && <sup>{footnoteId}</sup>}
        </div>
        <div className="text-highlight lg:leading-inherit text-[15px] font-medium lg:text-base">
          {data}
        </div>
      </div>
    </li>
  );
}

function Footnotes({ references }) {
  return (
    <ol className="ml-5 list-decimal space-y-0.5 text-xs leading-normal">
      {references.map((reference) => (
        <li className="pl-0.5" key={reference.id}>{`${reference.content}`}</li>
      ))}
    </ol>
  );
}

export default ProductDetails;
