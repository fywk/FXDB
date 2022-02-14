import { ReactElement } from "react";

export default function ListItem({
  title,
  data,
  footnoteId,
}: {
  title: string | ReactElement;
  data: string;
  footnoteId?: number;
}) {
  return (
    <li className="mx-auto flex w-[99%] flex-wrap items-center justify-between leading-[3rem]">
      <div className="leading-inherit text-sm uppercase">
        {title}
        {footnoteId && <sup>{footnoteId}</sup>}
      </div>
      <div className="text-highlight text-[15px] font-medium">{data}</div>
    </li>
  );
}
