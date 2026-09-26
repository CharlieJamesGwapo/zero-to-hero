"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function RouteLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === "/curriculum" && pathname.startsWith("/learn/"));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
