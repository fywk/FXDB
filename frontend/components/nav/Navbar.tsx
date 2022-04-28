import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { SearchIcon } from "@heroicons/react/outline";
import { IconBrandGithub } from "@tabler/icons";

import { mainMenu } from "../../lib/config/menus";
import { siteConfig as site } from "../../lib/config/site";
import MobileMenu from "./MobileMenu";
import NavItem from "./NavItem";

export default function Navbar() {
  const links = mainMenu;
  const router = useRouter();

  return (
    <header
      className={clsx(
        router.pathname !== "/" &&
          "border-b border-gray-200/50 dark:border-gray-800/50",
        "py-4"
      )}
    >
      <div className="container relative mx-auto flex max-w-6xl items-center justify-between gap-x-4 px-5 sm:px-8">
        <div className="select-none text-2xl font-black">
          <Link href="/">
            <a className="text-link" title={`${site.name} Home`}>
              {site.name}
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
              {links.map(({ url, name, id }) => (
                <NavItem
                  link={url}
                  text={name}
                  itemStyle={clsx(
                    "hidden text-sm font-semibold md:inline",
                    router.asPath === url ? "text-fxdb" : "hover:text-link"
                  )}
                  key={id}
                />
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
              <SearchIcon className="h-5 w-5 stroke-2.25" />
            </button>
            <a
              href="https://github.com/fywk/FXDB"
              className="hover:text-link hidden h-8 w-8 items-center justify-center md:flex md:h-fit md:w-fit"
              title="View Source on GitHub"
              rel="noopener noreferrer"
            >
              <span className="sr-only">View Source on GitHub</span>
              <IconBrandGithub className="h-5 w-5 stroke-2.25" />
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
