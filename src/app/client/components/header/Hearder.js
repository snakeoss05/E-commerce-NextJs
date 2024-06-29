import React from "react";
import Carousel from "./Carousel";
import Link from "next/link";

export default function Hearder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 ">
      <div className="col-span-2  lg:mx-auto p-4  lg:p-4 lg:border-r border-gray-200 lg:pe-8">
        <ul className="grid grid-cols-1 gap-4">
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/smartphone-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>Phones</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/laptop-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>Laptops</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/tablet-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>Tablets</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/headphones-square-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>HeadPhones</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/smartwatch-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>SmartWatch</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/airpods-alt-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>Accessories</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-lg hover:bg-gray-200 font-bold p-2 gap-4 flex items-center flex-row">
              <img
                src="/images/gaming-pad-alt-1-svgrepo-com.svg"
                className="w-8 h-8"
                alt="logo"
              />
              <span>Gaming</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-4 p-4 ">
        <Carousel />
      </div>
    </div>
  );
}
