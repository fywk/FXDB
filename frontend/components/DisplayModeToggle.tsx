import clsx from "clsx";
import { Fragment } from "react";

import { Listbox } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons";

import { DisplayOption } from "../lib/types";

const displayOptions: DisplayOption[] = [
  { value: "grid", label: "Grid view", icon: IconLayoutGrid },
  { value: "list", label: "List view", icon: IconLayoutList },
];

const DisplayModeToggle = ({ selectedMode, setSelectedMode }) => {
  return (
    <Listbox value={selectedMode} onChange={setSelectedMode}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Label className="sr-only">View mode</Listbox.Label>
          <Listbox.Button className="hover:text-bright relative h-11 rounded-md border bg-white px-3 text-left focus:outline-none dark:border-transparent dark:bg-gray-800 md:pr-8">
            {selectedMode === "grid" && <IconLayoutGrid size={24} />}
            {selectedMode === "list" && <IconLayoutList size={24} />}
            <span className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-2 md:flex">
              {open ? (
                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
          </Listbox.Button>
          <Listbox.Options className="text-bright absolute right-0 z-10 mt-1.5 w-36 overflow-hidden rounded-md border bg-white py-1 font-medium shadow-lg focus:outline-none dark:border-transparent dark:bg-gray-800">
            {displayOptions.map(({ value, label, icon: Icon }) => (
              <Listbox.Option key={value} value={value} as={Fragment}>
                {({ selected }) => (
                  <li
                    className={clsx(
                      selected && "text-fxdb",
                      "flex cursor-pointer select-none items-center gap-x-1.5 px-3 py-1.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700/25"
                    )}
                  >
                    <Icon size={22} />
                    {label}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};

export default DisplayModeToggle;
