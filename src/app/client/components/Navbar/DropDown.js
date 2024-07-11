"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authAction";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DropDown() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.token);
  const [dropdown, setDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a loading state or a placeholder during hydration
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 flex-shrink-0 text-gray-500 hover:text-sky-500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor">
        <circle
          cx="12"
          cy="9"
          r="3"
          stroke="currentColor"
          strokeWidth="1.104"></circle>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.104"></circle>
        <path
          d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
          stroke="currentColor"
          strokeWidth="1.104"
          strokeLinecap="round"></path>
      </svg>
    );
  }

  return (
    <div className="relative cursor-pointer ">
      <div className="cursor-pointer">
        {isAuth ? (
          <svg
            viewBox="0 0 24 24"
            className="h-8 p-1 w-8  flex-shrink-0 text-gray-500 hover:text-sky-500 ms-auto leading-5"
            fill="none"
            onClick={() => setDropdown(!dropdown)}
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor">
            <circle
              cx="12"
              cy="9"
              r="3"
              stroke="currentColor"
              strokeWidth="1.104"></circle>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.104"></circle>
            <path
              d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
              stroke="currentColor"
              strokeWidth="1.104"
              strokeLinecap="round"></path>
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            onClick={() => router.push("/client/pages/signin")}
            className="h-6 w-6 flex-shrink-0 text-gray-500 hover:text-sky-500 "
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor">
            <circle
              cx="12"
              cy="9"
              r="3"
              stroke="currentColor"
              strokeWidth="1.104"></circle>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.104"></circle>
            <path
              d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
              stroke="currentColor"
              strokeWidth="1.104"
              strokeLinecap="round"></path>
          </svg>
        )}

        <div
          className={`origin-top-left absolute right-0  w-fit top-full h-fit  sm:h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition ease-out duration-300 ${
            dropdown ? "transform  opacity-100 " : "transform  opacity-0 "
          }`}
          onMouseLeave={() => setDropdown(false)}>
          <div className="flex relative flex-col justify-center items-start px-5 pt-5 pb-2.5 text-sm leading-5 bg-opacity-50  text-center rounded backdrop-blur-[75px] bg-black bg-opacity-30 w-64 text-neutral-100 text-nowrap">
            <Link
              href="/client/pages/myaccount/myprofile"
              className="flex w-full gap-4 hover:bg-gray-500 px-2 rounded cursor-pointer transition-all duration-300 ">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="my-auto">Manage My Account</div>
            </Link>

            <Link
              href="/client/pages/myaccount/myorder"
              className="flex gap-4 mt-3.5 w-full py-1 hover:bg-gray-500 px-2 rounded cursor-pointer transition-all duration-300 ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 6.3V20.5C3 20.7652 3.10536 21.0196 3.29289 21.2071C3.48043 21.3946 3.73478 21.5 4 21.5H20C20.2652 21.5 20.5196 21.3946 20.7071 21.2071C20.8946 21.0196 21 20.7652 21 20.5V6.3H3Z"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 6.3L18.1665 2.5H5.8335L3 6.3M15.7775 9.6C15.7775 11.699 14.0865 13.4 12 13.4C9.9135 13.4 8.222 11.699 8.222 9.6"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>My Order</div>
            </Link>

            <div
              className="flex gap-4 mt-3.5 w-full py-1 hover:bg-gray-500 px-2 rounded cursor-pointer transition-all duration-300 whitespace-nowrap"
              onClick={() => dispatch(logout())}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 12H13.5M6 15L3 12L6 9M11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H13C12.4696 20 11.9609 19.7893 11.5858 19.4142C11.2107 19.0391 11 18.5304 11 18V17"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
