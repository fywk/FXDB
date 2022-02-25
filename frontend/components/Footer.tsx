import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto max-w-6xl border-t border-gray-200 px-5 py-8 dark:border-gray-800 print:hidden sm:px-8 md:py-10 lg:py-12">
      <div className="flex flex-col items-center justify-center gap-y-1.5 leading-relaxed md:flex-row md:justify-between">
        <p className="order-last text-sm md:order-first">
          Made with <span className="text-[#f20505]">♥</span> by{" "}
          <a
            href="https://fywk.xyz"
            className="hover:text-link"
            title="Francis Yeong"
          >
            @fywk
          </a>
          .
        </p>
        <div className="flex items-center space-x-1.5 text-xs md:space-x-3 md:text-sm">
          <p>
            <Link href="/disclaimer">
              <a className="hover:text-link">Disclaimer</a>
            </Link>
          </p>
          <p className="before:text-dimmed before:mr-1.5 before:content-['•'] md:before:mr-3">
            <Link href="/statistics">
              <a className="hover:text-link">Statistics</a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
