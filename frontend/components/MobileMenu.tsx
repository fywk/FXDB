import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline";

export default function MobileMenu({ links, display = "md:hidden" }) {
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    Router.events.on("routeChangeComplete", closeMenu);
    return () => {
      Router.events.off("routeChangeComplete", closeMenu);
    };
  }, [isOpen]);

  return (
    <nav className={display}>
      <button
        type="button"
        onClick={openMenu}
        className="hover:text-link flex h-8 w-8 items-center justify-center"
      >
        <span className="sr-only">Menu</span>
        <DotsVerticalIcon className="h-6 w-6" />
      </button>
      <Dialog
        as="div"
        open={isOpen}
        onClose={closeMenu}
        className={clsx("fixed inset-0 z-50", display)}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur dark:bg-gray-900/50" />
        <div className="fixed top-4 right-4 w-64 max-w-full rounded-xl bg-white px-6 py-7 font-medium shadow-lg dark:bg-gray-800">
          <button
            type="button"
            onClick={closeMenu}
            className="active:text-link hover:text-link absolute top-5 right-5 flex h-8 w-8 items-center justify-center focus:outline-none"
          >
            <span className="sr-only">Close menu</span>
            <XIcon className="h-5.5 w-5.5" />
          </button>
          <ul className="text-link space-y-6">
            {links.map((link, i) => (
              <MenuItem href={link.href} key={i}>
                {link.title}
              </MenuItem>
            ))}
            <li>
              <a
                href="https://github.com/fywk/FXDB"
                className="hover:text-fxdb"
                rel="noopener noreferrer"
              >
                View Source on GitHub
              </a>
            </li>
          </ul>
        </div>
      </Dialog>
    </nav>
  );
}

function MenuItem({ href, children }) {
  return (
    <li>
      <Link href={href}>
        <a className="hover:text-fxdb">{children}</a>
      </Link>
    </li>
  );
}
