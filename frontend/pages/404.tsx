import Meta from "../components/Meta";

export default function Custom404() {
  return (
    <>
      <Meta title="404 - Page Not Found | FXDB" />
      <div className="text-center space-y-2 m-auto">
        <h1 className="text-8xl lg:text-9xl font-bold">404</h1>
        <h2 className="lg:text-xl font-semibold">
          The page could not be found!
        </h2>
      </div>
    </>
  );
}
