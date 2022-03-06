import Link from "next/link";

import { NavLink } from "../../lib/types";

export default function NavItem({
  link,
  text,
  itemStyle,
}: {
  link: NavLink["url"];
  text: NavLink["name"];
  itemStyle: string;
}) {
  return (
    <li>
      <Link href={link}>
        <a className={itemStyle}>{text}</a>
      </Link>
    </li>
  );
}
