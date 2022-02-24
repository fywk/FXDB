import Meta from "../components/Meta";

export default function Custom404() {
  return (
    <>
      <Meta title="404 - Page Not Found | FXDB" />
      <div className="m-auto space-y-2 text-center">
        <h1 className="text-8xl font-bold lg:text-9xl lg:font-extrabold">
          404
        </h1>
        <h2 className="font-semibold lg:text-xl">
          The page could not be found!
        </h2>
      </div>
    </>
  );
}
