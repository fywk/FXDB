export default function SpecItem({
  title,
  data,
  footnoteId,
}: {
  title: string;
  data: string | number;
  footnoteId?: number;
}) {
  return (
    <li className="mx-auto flex w-[99%] items-center justify-between py-3.5">
      <div className="w-[47.5%] text-sm uppercase">
        {title}
        {footnoteId && <sup>{footnoteId}</sup>}
      </div>
      <div className="text-brightess w-[52.5%] text-right text-[15px] font-medium">
        {data}
      </div>
    </li>
  );
}
