import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto max-w-6xl border-t border-gray-200 px-5 py-8 text-sm dark:border-gray-800 print:hidden sm:px-8 md:py-10 lg:py-12">
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
        <div className="flex items-center space-x-2 md:space-x-3">
          <p>
            <Link href="/disclaimer">
              <a className="hover:text-link">Disclaimer</a>
            </Link>
          </p>
          <p className="before:mr-2 before:content-['•'] md:before:mr-3">
            <Link href="/statistics">
              <a className="hover:text-link">Statistics</a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
