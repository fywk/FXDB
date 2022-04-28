import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 print:hidden">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-center gap-y-0.5 px-5 py-8 text-sm leading-relaxed sm:px-8 md:flex-row md:justify-between md:py-10 lg:py-12">
        <p className="order-last md:order-first">
          Made with <span className="text-[#f20505]">♥</span> by{" "}
          <a
            href="https://fywk.xyz"
            className="hover:text-link"
            title="Francis Yeong"
          >
            @fywk
          </a>
        </p>
        <div className="flex items-center space-x-1.5 md:space-x-2.5">
          <p>
            <Link href="/disclaimer">
              <a className="hover:text-link">Disclaimer</a>
            </Link>
          </p>
          <p className="before:text-dimmed before:mr-1.5 before:content-['•'] md:before:mr-2.5">
            <Link href="/statistics">
              <a className="hover:text-link">Statistics</a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
