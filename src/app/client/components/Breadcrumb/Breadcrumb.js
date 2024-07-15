"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  // Split the pathname and filter out the "client" segment
  if (pathname === "/") return null;
  const pathnames = pathname
    .split("/")
    .filter((x) => x && x !== "client" && x !== "pages");
  return (
    <nav
      aria-label="breadcrumb"
      className="flex capitalize ms-2 sm:ms-28 mt-6 overflow-x-hidden">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <span className="ms-1.5 text-xs font-medium"> Home </span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li
              key={href}
              className="relative flex items-center max-w-32  px-2"
              aria-current="page">
              <span className="absolute inset-y-0  -start-px h-10 w-4 bg-gray-100 [clipPath:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
              <a
                href="#"
                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium truncate transition hover:text-gray-900 ">
                {value}
              </a>
            </li>
          ) : (
            <li key={href} className="breadcrumb-item ">
              <Link
                href={href}
                className="flex h-10 border-l border-gray-200 items-center bg-gray-100 pe-4 ps-8 text-xs truncate font-medium transition hover:text-gray-700">
                {value}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
