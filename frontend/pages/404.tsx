import Link from "next/link";

import Meta from "../components/Meta";

export default function Custom404() {
  return (
    <>
      <Meta title="Page Not Found" />
      <div className="m-auto flex max-w-sm flex-col items-center justify-center py-12 text-center">
        <h1 className="mb-0.5 bg-gradient-to-br from-primary to-secondary bg-clip-text text-9xl font-bold text-transparent dark:bg-gradient-to-tl md:text-[9rem] lg:text-[10rem]">
          404
        </h1>
        <h2 className="mb-4 text-4xl font-bold md:text-[2.5rem]">
          Page Not Found
        </h2>
        <p className="mb-8 md:text-lg">
          {`Oops! Looks like the page you're requesting doesn't exist or unavailable for the time being.`}
        </p>
        <Link href="/">
          <a className="text-fxdb w-full rounded-lg bg-primary/5 py-2.5 text-center font-medium transition hover:bg-primary/10 dark:bg-secondary/5 dark:hover:bg-secondary/10">
            Return to Home
          </a>
        </Link>
      </div>
    </>
  );
}
