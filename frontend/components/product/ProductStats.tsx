import { format } from "date-fns";
import { ReactNode } from "react";

import { convertToMP } from "../../lib/utils/unitConversion";
import ViewCounter from "../ViewCounter";

export default function ProductStats(props) {
  const path =
    props.type === "camera"
      ? "cameras"
      : props.type === "lens"
      ? "lenses"
      : null;
  const megapixels = convertToMP(props.resolutionX, props.resolutionY);

  return (
    <li className="flex flex-col space-y-4 md:space-y-4.5 lg:space-y-5">
      <h1 className="text-fxdb text-2xl font-semibold lg:text-[1.625rem]">
        {props.name}
      </h1>
      <div className="overflow-x-auto">
        <div className="mb-4 grid w-80 min-w-full grid-cols-3 items-center justify-items-center gap-x-1.5 text-center md:gap-x-2">
          {props.type === "camera" && (
            <StatItem title="Effective Pixels" data={`${megapixels} MP`} />
          )}
          {props.type === "lens" && (
            <StatItem title="Brand" data={props.brand} />
          )}
          <StatItem
            title="Announced"
            data={
              <time dateTime={props.launchDate}>
                {format(new Date(props.launchDate), "dd MMM y")}
              </time>
            }
          />
          <StatItem
            title="Views"
            data={<ViewCounter path={path} slug={props.slug} />}
          />
        </div>
      </div>
    </li>
  );
}

function StatItem({ title, data }: { title: string; data: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs leading-snug">{title}</p>
      <p className="text-brightess text-lg font-semibold lg:text-xl">{data}</p>
    </div>
  );
}
