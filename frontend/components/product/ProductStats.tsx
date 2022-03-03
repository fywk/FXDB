import { ReactElement } from "react";

import { convertToMP, dateFormatter } from "../../lib/util";
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
    <li className="md:space-y-4.5 flex flex-col space-y-4 font-sans lg:space-y-5">
      <h1 className="text-fxdb text-2xl font-bold lg:text-[1.625rem]">
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
            title="Launched"
            data={dateFormatter.format(new Date(props.launchDate))}
          />
          <StatItem
            title="Views"
            data={<ViewCounter path={path} slug={props.slug} recordView />}
          />
        </div>
      </div>
    </li>
  );
}

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
      <p className="text-highlight text-lg font-semibold lg:text-xl">{data}</p>
    </div>
  );
}
