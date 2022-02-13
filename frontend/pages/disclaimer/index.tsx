import Meta from "../../components/Meta";

export default function DisclaimerPage() {
  return (
    <>
      <Meta title="Disclaimer" />
      <div className="py-8">
        <h1 className="mb-2 text-3xl font-bold">Disclaimer</h1>
        <ol className="list-inside list-decimal">
          <li>
            All logos and images are the property and are copyright of their
            respective owners.
          </li>
        </ol>
      </div>
    </>
  );
}
