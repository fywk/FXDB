import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { dateFormatter } from "../lib/util";

interface Camera {
  cameraType?: string;
  cameraMount?: { attributes: { name: string } };
  cameraFocalLength?: string;
  resolutionX?: number;
  resolutionY?: number;
  sensorSize?: string;
  sensorType?: string;
  maxShutterSpeed?: string;
  IBIS?: boolean;
}

interface Lens {
  brand?: string;
}

interface ProductDetailProps extends Camera, Lens {
  type: "cameras" | "lenses";
  name: string;
  launchDate: string;
  weatherResistance: boolean;
  weight: number;
  dataSource: string;
}

const ProductDetails: React.FC<ProductDetailProps> = (props) => {
  const router = useRouter();
  const goBack = () => router.back();

  // Convert weight from grams to ounces
  const weightOz = Math.round(props.weight * 0.03527396194958 * 100) / 100;

  return (
    <>
      <div className="hidden md:block md:pt-6 md:pb-4">
        <button
          type="button"
          onClick={goBack}
          className="text-fxdb group items-center space-x-1.5 rounded-lg md:flex"
        >
          <ChevronLeftIcon className="stroke-2.75 h-5 w-5 duration-300 group-hover:-translate-x-1" />
          <span className="font-medium text-inherit">Back</span>
        </button>
      </div>
      <div className="flex flex-col space-y-10">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 lg:gap-8">
          <div className="full-width md:full-width-reset">
            <div className="static">
              <button
                type="button"
                onClick={goBack}
                className="stroke-2.5 absolute top-3.5 left-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/70 text-gray-50 shadow-md md:hidden"
              >
                <span className="sr-only">Back</span>
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-square w-full bg-gray-200 dark:bg-gray-300 md:rounded-lg"></div>
          </div>
          <div>
            <ul className="flex flex-col divide-y divide-dotted divide-gray-300 font-mono tracking-tight dark:divide-gray-700">
              <li className="flex flex-col space-y-3 font-sans">
                <h1 className="text-fxdb text-2xl font-bold">{props.name}</h1>
                <div className="overflow-x-auto">
                  <div className="mb-3 grid w-[21rem] min-w-full grid-cols-3 items-center justify-items-center gap-x-1.5 text-center">
                    {props.resolutionX && props.resolutionY ? (
                      <StatItem
                        title="Effective Pixels"
                        data={`${Math.round(
                          (props.resolutionX * props.resolutionY) / 1_000_000
                        )} MP`}
                      />
                    ) : (
                      <StatItem title="Brand" data={props.brand} />
                    )}
                    <StatItem
                      title="Launched"
                      data={dateFormatter.format(new Date(props.launchDate))}
                    />
                    <StatItem title="Views" data="----" />
                  </div>
                </div>
              </li>
              {props.type === "cameras" && (
                <ListItem title="Camera type" data={props.cameraType} />
              )}
              {props.cameraMount && (
                <ListItem
                  title="Lens mount"
                  data={props.cameraMount.attributes.name}
                />
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
                title="Weather resistance"
                data={props.weatherResistance ? "Yes" : "No"}
              />
              {props.cameraType && (
                <ListItem title="IBIS" data={props.IBIS ? "Yes" : "No"} />
              )}
              <ListItem
                title="Weight"
                data={`${props.weight} grams (${weightOz} ounces)`}
                footnoteId={2}
              />
            </ul>
          </div>
        </section>
        <section>
          <a
            href={props.dataSource}
            className="bg-primary/10 dark:bg-secondary/10 text-fxdb hover:bg-primary/[0.15] dark:hover:bg-secondary/[0.15] flex w-full items-center justify-between rounded-lg px-5 py-2.5 text-center md:max-w-xs"
            title={new URL(props.dataSource).hostname}
            rel="noopener noreferrer"
          >
            <span>Data Source</span>
            <ExternalLinkIcon className="h-5 w-5" />
          </a>
        </section>
        <section className="space-y-5 pb-5">
          <div className="h-px bg-gray-200 dark:bg-gray-800" />
          {props.type === "cameras" && (
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

function StatItem({ title, data }: { title: string; data: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs leading-snug">{title}</p>
      <p className="text-highlight text-lg font-semibold leading-snug md:text-xl">
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
  title: string;
  data: string;
  footnoteId?: number;
}) {
  return (
    <li>
      <div className="mx-auto flex w-[99%] flex-wrap items-center justify-between leading-[3rem]">
        <div className="text-sm uppercase">
          {title}
          {footnoteId && <sup>{footnoteId}</sup>}
        </div>
        <div className="text-highlight text-[15px] font-medium">{data}</div>
      </div>
    </li>
  );
}

function Footnotes({ references }) {
  return (
    <ol className="ml-5 list-decimal text-xs font-light leading-normal">
      {references.map((reference) => (
        <li className="pl-0.5" key={reference.id}>{`${reference.content}`}</li>
      ))}
    </ol>
  );
}

export default ProductDetails;
