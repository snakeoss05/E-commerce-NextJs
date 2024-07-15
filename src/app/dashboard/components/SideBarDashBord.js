import React from "react";
import Link from "next/link";
export default function SideBarDashBord() {
  return (
    <div className="bg-white border-b sm:text-end lg:border-b-0 lg:border-r border-gray-200 p-6 dark:bg-gray-800 flex flex-col mt-4 gl:mt-20 ">
      <div className="space-y-4">
        <p className="text-1xl font-bold">Manage Products</p>
        <ul className="mt-4 space-y-2 ps-8 text-base text-gray-500 dark:text-gray-400 ">
          <li className="hover:text-blue-600">
            <Link href="/dashboard/addproduct">Add Product</Link>
          </li>
        </ul>
        <p className="text-1xl font-bold">Manage Orders</p>
        <ul className="mt-4 space-y-2 ps-8 text-base text-gray-500 dark:text-gray-400">
          <li className="hover:text-blue-600">
            <Link href="/dashboard/orders">Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
