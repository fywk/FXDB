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
    <li className="mx-auto flex w-[99%] items-center justify-between py-3.5">
      <div className="w-[45%] text-sm uppercase">
        {title}
        {footnoteId && <sup>{footnoteId}</sup>}
      </div>
      <div className="text-highlight w-[55%] text-right text-[15px] font-medium">
        {data}
      </div>
    </li>
  );
}
