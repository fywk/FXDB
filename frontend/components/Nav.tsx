import Link from "next/link";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  return (
    <section className="py-3">
      <div className="container max-w-5xl flex items-center justify-between gap-x-4 mx-auto px-4 sm:px-8">
        <div className="text-2xl font-black select-none">
          <Link href="/">
            <a className="text-link" title="FXDB">
              FXDB
            </a>
          </Link>
        </div>
        <div className="flex items-center md:divide-x divide-gray-300 dark:divide-gray-700 space-x-6">
          <nav>
            <ul className="flex space-x-8">
              <NavItem href="/cameras" text="Cameras" />
              <NavItem href="/lenses" text="Lenses" />
              <NavItem href="/brands" text="Brands" />
            </ul>
          </nav>
          <div className="flex items-center space-x-1.5 md:space-x-3 lg:space-x-4 pl-6">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 md:w-fit md:h-fit hover:text-link"
              title="Search"
            >
              <span className="sr-only">Search</span>
              <SearchIcon className="h-5.5 w-5.5" />
            </button>
            <a
              href="https://github.com/fywk/FXDB"
              className="hidden md:flex items-center justify-center w-8 h-8 md:w-fit md:h-fit hover:text-link"
              title="View Source on GitHub"
              rel="noopener noreferrer"
            >
              <span className="sr-only">View Source on GitHub</span>
              <GithubIcon className="h-5.5 w-5.5" />
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
    </section>
  );
}

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <li>
      <Link href={href}>
        <a
          className={`hidden md:inline ${
            isActive ? "text-link font-semibold" : "hover:text-link"
          }`}
          title={text}
        >
          <span>{text}</span>
        </a>
      </Link>
    </li>
  );
}

function GithubIcon({ ...attr }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...attr}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
    </svg>
  );
}