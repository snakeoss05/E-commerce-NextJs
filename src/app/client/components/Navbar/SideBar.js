"use client";
import React from "react";
import Link from "next/link";

export default function SideBar() {
  const [isOpen, setisOpen] = React.useState(false);

  return (
    <div className="block md:hidden ">
      <button
        aria-label="Toggle Menu"
        onClick={() => setisOpen(!isOpen)}
        className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
        type="button">
        <span className="sr-only">Toggle menu</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-50 flex items-center justify-end bg-black bg-opacity-50  md:hidden mx-auto">
          <div className="w-full grid grid-cols-2">
            <div>
              <ul className="flex flex-col me-auto items-center gap-6 text-sm bg-white rounded-r-lg  shadow-xl transition-transform duration-500 ease-in-out transform transition-all h-screen p-6">
                <img
                  src="/images/logo.AVIF "
                  alt="logo"
                  className="h-16 w-auto"
                />
                <svg
                  className="h-6 w-6 absolute top-6 right-6 cursor-pointer me-auto hover:rotate-90 transition-transform duration-500 ease-in-out"
                  viewBox="0 0 24 24"
                  onClick={() => setisOpen(false)}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000">
                  <path
                    d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"></path>
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"></path>
                </svg>
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 after:w-0 after:h-0.5 after:block after:bg-gray-500 after:content-[''] after:hover:w-full after:bg-gray-700 after:transition-all after:duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 after:w-0 after:h-0.5 after:block after:bg-gray-500 after:content-[''] after:hover:w-full after:bg-gray-700 after:transition-all after:duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 after:w-0 after:h-0.5 after:block after:bg-gray-500 after:content-[''] after:hover:w-full after:bg-gray-700 after:transition-all after:duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-700 after:w-0 after:h-0.5 after:block after:bg-gray-500 after:content-[''] after:hover:w-full after:bg-gray-700 after:transition-all after:duration-300">
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div
              onClick={() => setisOpen(false)}
              className="h-full w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
