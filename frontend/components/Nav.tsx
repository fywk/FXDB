import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { SearchIcon } from "@heroicons/react/outline";

import MobileMenu from "./MobileMenu";

export default function Nav() {
  const navLinks = [
    { title: "Cameras", href: "/cameras" },
    { title: "Lenses", href: "/lenses" },
    { title: "Brands", href: "/brands" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-gray-50/[.85] py-3.5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
      <div className="container relative mx-auto flex max-w-6xl items-center justify-between gap-x-4 px-5 sm:px-8">
        <div className="select-none text-2xl font-black">
          <Link href="/">
            <a className="text-link" title="FXDB Home">
              FXDB
            </a>
          </Link>
        </div>
        <a
          href="#content"
          className="text-fxdb absolute left-[7.5rem] origin-left scale-x-0 rounded bg-gray-50 px-4 py-1 font-medium transition-transform duration-100 ease-in focus:scale-x-100 dark:bg-gray-900"
          tabIndex={0}
        >
          Skip navigation
        </a>
        <div className="flex items-center space-x-6 divide-gray-300 dark:divide-gray-700 print:hidden md:divide-x">
          <nav>
            <ul className="flex space-x-8">
              {navLinks.map((navLink, i) => (
                <NavItem href={navLink.href} title={navLink.title} key={i} />
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-2 pl-6 md:space-x-4">
            <button
              type="button"
              className="hover:text-link flex h-8 w-8 items-center justify-center md:h-fit md:w-fit"
              title="Search"
            >
              <span className="sr-only">Search</span>
              <SearchIcon className="stroke-2.25 h-5 w-5" />
            </button>
            <a
              href="https://github.com/fywk/FXDB"
              className="hover:text-link hidden h-8 w-8 items-center justify-center md:flex md:h-fit md:w-fit"
              title="View Source on GitHub"
              rel="noopener noreferrer"
            >
              <span className="sr-only">View Source on GitHub</span>
              <GithubIcon className="stroke-2.25 h-5 w-5" />
            </a>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, title }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <li>
      <Link href={href}>
        <a
          className={clsx(
            "hidden text-sm font-semibold md:inline",
            isActive ? "text-fxdb" : "hover:text-link"
          )}
        >
          <span>{title}</span>
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
