import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto max-w-5xl px-4 pb-10 text-sm sm:px-8">
      <div className="mb-8 h-px bg-gray-200 dark:bg-gray-800"></div>
      <div className="flex flex-col space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-3 divide-x divide-gray-300 dark:divide-gray-700 md:space-x-4">
          <div>
            Made with <span className="text-[red]">♥</span> by{" "}
            <a
              href="https://fywk.xyz"
              className="hover:text-link"
              title="Francis Yeong"
            >
              @fywk
            </a>
          </div>
          <div className="pl-3 md:pl-4">
            <Link href="/disclaimer">
              <a className="hover:text-link" title="Disclaimer">
                Disclaimer
              </a>
            </Link>
          </div>
        </div>
        <div>
          <a
            href="https://github.com/fywk/FXDB"
            className="hover:text-link"
            title="View Source on GitHub"
          >
            View Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
