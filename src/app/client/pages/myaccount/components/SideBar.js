import React from "react";
import Link from "next/link";
export default function SideBar() {
  return (
    <div className="rounded-lg bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-6 dark:bg-gray-800 flex flex-col mt-8 gl:mt-20 ">
      <div className="space-y-4">
        <p className="text-1xl font-bold">Manage My Account</p>
        <ul className="mt-4 space-y-2 ps-8 text-base text-gray-500 dark:text-gray-400 ">
          <li className="hover:text-blue-600">
            <Link href="/client/pages/myaccount/myprofile"> My Profile</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/client/pages/myaccount/myAddress">My Address </Link>
          </li>
        </ul>
        <p className="text-1xl font-bold">My Orders</p>
        <ul className="mt-4 space-y-2 ps-8 text-base text-gray-500 dark:text-gray-400">
          <li className="hover:text-blue-600">
            <Link href="/client/pages/myaccount/myorder">My Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
