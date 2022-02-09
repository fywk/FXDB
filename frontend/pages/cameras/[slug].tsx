import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Meta from "../../components/Meta";
import { dateFormatter } from "../../lib/util";

export default function CameraPage({ camera }) {
  const sensorSize = camera.sensorSize === "APSC" ? "APS-C" : "Medium Format";
  // Convert grams to ounces
  const weightOz = Math.round(camera.weight * 0.03527396194958 * 100) / 100;

  return (
    <>
      <Meta title={camera.name} />
      <div className="space-y-10 md:pt-8">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="full-width md:full-width-reset">
            <div className="static">
              <div className="absolute top-2.5 left-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-900/75 text-gray-50 shadow-md md:hidden">
                <Link href="/cameras">
                  <a>
                    <ArrowLeftIcon className="h-4.5 w-4.5" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="aspect-square w-full bg-gray-200 dark:bg-gray-300 md:rounded-lg"></div>
          </div>
          <div>
            <ul className="flex flex-col divide-y divide-dotted divide-gray-300 font-mono text-[15px] tracking-tight dark:divide-gray-700">
              <li className="mb-3 space-y-3 font-sans">
                <h1 className="text-fxdb text-2xl font-bold">{camera.name}</h1>
                <div className="grid grid-cols-3 items-center justify-items-center gap-1 text-center">
                  {camera.focalLength && (
                    <StatItem title="Focal Length" data={camera.focalLength} />
                  )}
                  {camera.mount.data && (
                    <StatItem
                      title="Lens Mount"
                      data={camera.mount.data.attributes.name}
                    />
                  )}
                  <StatItem
                    title="Launched"
                    data={dateFormatter.format(new Date(camera.launchDate))}
                  />
                  <StatItem title="Views" data="----" />
                </div>
              </li>
              <ListItem
                title="Camera type"
                data={camera.category.data.attributes.name}
              />
              <ListItem
                title="Effective pixels"
                data={`${Math.round(
                  (camera.resolutionX * camera.resolutionY) / 1_000_000
                )} megapixels`}
              />
              <ListItem
                title="Maximum resolution"
                data={`${camera.resolutionX} × ${camera.resolutionY}`}
              />
              <ListItem title="Sensor size" data={sensorSize} />
              <ListItem
                title="Sensor type"
                data={camera.sensor.data.attributes.name}
              />
              <ListItem
                title="Max shutter speed"
                data={camera.maxShutterSpeed}
                footnoteId={1}
              />
              <ListItem
                title="Weather resistant"
                data={camera.features.weatherResistant ? "Yes" : "No"}
              />
              <ListItem
                title="IBIS"
                data={camera.features.IBIS ? "Yes" : "No"}
              />
              <ListItem
                title="Weight"
                data={`${camera.weight.toLocaleString()} grams (${weightOz.toLocaleString()} ounces)`}
                footnoteId={2}
              />
            </ul>
          </div>
        </section>
        <section>
          <a
            href={camera.dataSource}
            className="bg-primary/5 dark:bg-secondary/5 text-fxdb hover:bg-primary/10 dark:hover:bg-secondary/10 flex items-center justify-between rounded-lg px-4 py-2.5 text-center md:max-w-xs"
            title={new URL(camera.dataSource).hostname}
          >
            <span>Data Source</span>
            <ExternalLinkIcon className="h-5 w-5" />
          </a>
        </section>
        <section className="space-y-4 pb-4">
          <div className="h-px bg-gray-200 dark:bg-gray-800" />
          <Footnotes
            references={[
              {
                id: 1,
                content:
                  "Maximum shutter speed of mechanical shutter. Faster shutter speeds could be attained using electronic shutter.",
              },
              {
                id: 2,
                content: "Including the weight of battery and memory card.",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://fxdb-backend.herokuapp.com/api/cameras");
  const cameras = await res.json();

  const paths = cameras.data.map((camera) => ({
    params: { slug: String(camera.attributes.slug) },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://fxdb-backend.herokuapp.com/api/cameras?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const camera = await res.json();

  return {
    props: {
      camera: camera.data[0].attributes,
      revalidate: 10,
    },
  };
};

function StatItem({ title, data }: { title: string; data: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs leading-snug">{title}</p>
      <p className="text-highlight text-lg font-medium leading-snug">{data}</p>
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
      <div className="mx-auto flex w-[99%] items-center justify-between leading-10">
        <div className="text-sm">
          {title}
          {footnoteId && <sup>{footnoteId}</sup>}
        </div>
        <div className="text-highlight font-medium">{data}</div>
      </div>
    </li>
  );
}

function Footnotes({ references }) {
  return (
    <ol className="ml-5 list-decimal space-y-0.5 text-xs font-light leading-normal">
      {references.map((reference, i) => (
        <li className="pl-0.5" key={i}>{`${reference.content}`}</li>
      ))}
    </ol>
  );
}
