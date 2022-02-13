import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto max-w-6xl px-4 pb-10 text-sm print:hidden sm:px-8">
      <div className="mb-8 h-px bg-gray-200 dark:bg-gray-800"></div>
      <div className="flex items-center justify-center leading-relaxed md:justify-start">
        <div className="flex items-center space-x-3 divide-x divide-gray-300 dark:divide-gray-700 md:space-x-4">
          <div>
            Made with <span className="text-primary">♥</span> by{" "}
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
      </div>
    </footer>
  );
}
