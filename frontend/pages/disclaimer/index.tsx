import Meta from "../../components/Meta";

export default function Disclaimer() {
  return (
    <>
      <Meta title="Disclaimer" />
      <div className="space-y-5 py-10">
        <h1 className="text-4xl font-bold">Statistics</h1>
        <ul className="list-inside list-disc">
          <li>
            All logos and images are the property and are copyright of their
            respective owners.
          </li>
        </ul>
      </div>
    </>
  );
}
