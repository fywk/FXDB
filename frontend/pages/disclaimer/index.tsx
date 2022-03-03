import Meta from "../../components/Meta";

export default function Disclaimer() {
  const list = [
    {
      id: 1,
      content:
        "All logos and images are the property and are copyright of their respective owners.",
    },
    {
      id: 2,
      content:
        "The launch date is the date when a particular product was being announced and it may not necessarily means that it is available to purchase yet.",
    },
    {
      id: 3,
      content:
        "Some newer products that were just announced might not be available on the market until a later date.",
    },
  ];

  return (
    <>
      <Meta title="Disclaimer" />
      <div className="space-y-5 py-10">
        <h1 className="text-3xl font-bold md:text-4xl">Disclaimer</h1>
        <ul
          role="list"
          className="marker:text-fxdb pl-4.5 list-disc space-y-2 text-sm md:text-base"
        >
          {list.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
