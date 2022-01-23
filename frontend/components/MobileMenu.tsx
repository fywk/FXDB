import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function MobileMenu({ display = "md:hidden" }) {
  let [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className={display}>
      <button
        type="button"
        onClick={openMenu}
        className="flex items-center justify-center w-8 h-8 hover:text-link"
      >
        <span className="sr-only">Menu</span>
        <DotsVerticalIcon className="h-6 w-6" />
      </button>
      <Dialog
        as="div"
        open={isOpen}
        onClose={closeMenu}
        className={`fixed z-50 inset-0 ${display}`}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20 dark:bg-gray-900/80 backdrop-blur-sm" />
        <div className="fixed top-4 right-4 w-full max-w-xs p-6 bg-white dark:bg-gray-800 font-semibold shadow-lg rounded-xl">
          <button
            type="button"
            onClick={closeMenu}
            className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 active:text-link"
          >
            <span className="sr-only">Close menu</span>
            <XIcon className="h-5.5 w-5.5" />
          </button>
          <ul className="space-y-6">
            <MenuItem href="/cameras">Cameras</MenuItem>
            <MenuItem href="/lenses">Lenses</MenuItem>
            <MenuItem href="/brands">Brands</MenuItem>
            <li>
              <a href="https://github.com/fywk/FXDB" rel="noopener noreferrer">
                View Source on GitHub
              </a>
            </li>
          </ul>
        </div>
      </Dialog>
    </nav>
  );
}

function MenuItem({ href, children, ...rest }) {
  return (
    <li>
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    </li>
  );
}