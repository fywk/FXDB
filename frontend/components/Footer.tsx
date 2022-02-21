import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto max-w-6xl border-t border-gray-200 px-4 py-8 text-sm dark:border-gray-800 print:hidden sm:px-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-y-0.5 leading-relaxed md:flex-row md:justify-between">
        <p className="order-last md:order-first">
          Made with <span className="text-primary">♥</span> by{" "}
          <a
            href="https://fywk.xyz"
            className="hover:text-link"
            title="Francis Yeong"
          >
            @fywk
          </a>
          .
        </p>
        <div className="flex items-center space-x-3 divide-x divide-gray-200 dark:divide-gray-800 md:space-x-4">
          <p>© {new Date().getFullYear()} FXDB</p>
          <p className="pl-3 md:pl-4">
            <Link href="/disclaimer">
              <a className="hover:text-link" title="Disclaimer">
                Disclaimer
              </a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
