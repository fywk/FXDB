import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-16 text-sm border-t border-gray-300 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:justify-between">
        <div className="flex items-center space-x-4 divide-x divide-gray-300 dark:divide-gray-700">
          <div>
            Made with <span className="text-red-600">♥</span> by{" "}
            <a href="https://fywk.xyz" className="hover:text-link">
              @fywk
            </a>
          </div>
          <div className="pl-4">
            <Link href="/disclaimer">
              <a className="hover:text-link">Disclaimer</a>
            </Link>
          </div>
        </div>
        <div>
          <a href="https://github.com/fywk/FXDB" className="hover:text-link">
            View Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}