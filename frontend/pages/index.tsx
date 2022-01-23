import Link from "next/link";
import { ChevronRightIcon, SearchIcon } from "@heroicons/react/outline";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1">
        <section className="grid grid-cols-1 justify-items-center pt-16 pb-12">
          <div className="grid grid-cols-1 gap-y-6 mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Fujifilm X and GFX Database
            </h1>
            <p className="max-w-3xl mx-auto text-lg">
              <strong className="text-highlight">FXDB</strong> is a database of
              cameras and lenses made for Fujifilm X and GFX systems. You can
              find relevant specifications for each product including products
              from third-party manufacturers.
            </p>
          </div>
          <SearchBar />
        </section>
        <section className="grid grid-cols-1 gap-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Latest Cameras</h1>
            <ViewMoreLink href="/cameras" />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Latest Lenses</h1>
              <ViewMoreLink href="/lenses" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"></div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function SearchBar() {
  return (
    <button
      type="button"
      className="group flex items-center justify-between w-full max-w-4xl bg-white dark:bg-gray-800 dark:hover:bg-gray-700/50 mx-auto px-5 py-3 ring-1 dark:ring-0 hover:ring-2 dark:hover:ring-0 ring-gray-300 active:ring-gray-400  rounded-full"
    >
      <div className="text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300">
        Search for a camera, lens, brand...
      </div>
      <div className="group-hover:text-gray-700 dark:group-hover:text-gray-300">
        <SearchIcon className="h-5.5 w-5.5" />
      </div>
    </button>
  );
}

function ViewMoreLink({ href }) {
  return (
    <div className="flex items-center space-x-0.5 hover:text-link">
      <ChevronRightIcon className="h-4 w-4" />
      <Link href={href}>
        <a className="text-xs uppercase">View more</a>
      </Link>
    </div>
  );
}
