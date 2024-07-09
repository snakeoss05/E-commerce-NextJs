"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { openCart } from "@/lib/features/cart/cartReducer";
import SideBar from "./SideBar";
import DropDown from "./DropDown";
import WishListIcon from "./WishListIcon";

export default function Navbar() {
  const totalitems = useAppSelector((state) => state.cart.totalQuantity);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center w-full justify-between">
          <div className="hidden md:flex items-center ">
            <Link href="/" className="block text-teal-600">
              <span className="sr-only">Home</span>
              <Image
                src="/images/logo.AVIF "
                width={200}
                height={200}
                alt="logo"
                className="h-16 w-auto "
              />
            </Link>
          </div>

          <div className="hidden lg:block mx-auto lg:ms-auto lg:me-32">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 after:w-0 after:h-0.5 after:block after:bg-gray-500 after:content-[''] after:hover:w-full after:bg-gray-700 after:transition-all after:duration-300">
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/client/pages/contact"
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
            </nav>
          </div>
          <SideBar />
          <div className="flex items-center  lg:w-auto gap-2 sm:gap-4">
            <SearchInput />

            <div className=" flex flex flex-row gap-2 sm:gap-4 items-center mx-auto  lg:mx-0">
              <div className="relative flex flex-row items-center gap-2 sm:gap-4">
                <DropDown />
              </div>
              <WishListIcon />
              <button
                type="button"
                onClick={() => dispatch(openCart())}
                className="h-6 w-6 relative">
                <svg
                  className="flex-shrink-0 text-gray-400 hover:text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {isMounted && (
                  <p className="absolute -top-2 -right-2 h-4 w-4 bg-primary-300 text-white text-xs font-semibold text-center rounded-full">
                    {totalitems}
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
