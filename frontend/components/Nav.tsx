import Link from "next/link";
import { useRouter } from "next/router";

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <li className="">
      <Link href={href}>
        <a
          className={`hover:bg-gray-800 px-4 py-2 rounded-lg ${
            isActive
              ? "text-current font-semibold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          title={text}
        >
          <span>{text}</span>
        </a>
      </Link>
    </li>
  );
}

export default function Nav() {
  return (
    <nav className="sticky top-0 mx-auto py-3">
      <div className="container max-w-5xl grid grid-cols-8 gap-x-4 items-center mx-auto px-4 sm:px-8">
        <div className="text-3xl font-black select-none">
          <Link href="/">
            <a title="FXDB">FXDB</a>
          </Link>
        </div>
        <ul className="col-span-6 flex space-x-1">
          <NavItem href="/cameras" text="Cameras" />
          <NavItem href="/lenses" text="Lenses" />
        </ul>
        <div className="justify-self-end"></div>
      </div>
    </nav>
  );
}
