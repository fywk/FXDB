import Link from "next/link";

import Meta from "../components/Meta";

export default function Custom404() {
  return (
    <>
      <Meta title="Page Not Found" />
      <div className="m-auto flex max-w-sm flex-col items-center justify-center py-12 text-center">
        <h1 className="from-primary to-secondary mb-0.5 bg-gradient-to-br bg-clip-text text-9xl font-extrabold text-transparent dark:bg-gradient-to-tl md:text-[9rem] lg:text-[10rem]">
          404
        </h1>
        <h2 className="mb-4 text-4xl font-bold md:text-[2.5rem]">
          Page Not Found
        </h2>
        <p className="mb-8 md:text-lg">
          Oops! Looks like the page you're requesting doesn't exist or
          unavailable for the time being.
        </p>
        <Link href="/">
          <a className="bg-primary/5 dark:bg-secondary/5 text-fxdb hover:bg-primary/10 dark:hover:bg-secondary/10 w-full rounded-lg py-2.5 text-center font-medium transition">
            Return to Home
          </a>
        </Link>
      </div>
    </>
  );
}
