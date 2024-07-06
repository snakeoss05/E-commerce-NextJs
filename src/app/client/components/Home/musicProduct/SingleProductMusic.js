import React from "react";
import Countdown from "../flashSales/Countdown";
import Image from "next/image";
export default function SingleProductMusic() {
  const targetDate = "2024-07-15T00:00:00";
  return (
    <div className="px-4 hidden lg:block lg:px-24 h-[500px] bg-gray-900 relative ">
      <div className="absolute top-0 h-full w-full left-0 px-4 lg:px-24 grid grid-cols-1 lg:grid-cols-2  rounded-lg">
        <div className="flex flex-col justify-between items-start py-8">
          <p className="text-lg font-bold text-green-500 mb-4">Categories</p>
          <h1 className="text-5xl font-bold text-white w-3/4 leading-relaxed ">
            Enhanced Your Music Experience
          </h1>
          <div className="text-white ">
            <Countdown targetDate={targetDate} />
          </div>

          <button
            id="buyNow"
            className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-600 mt-auto">
            Buy Now
          </button>
        </div>
        <div className="flex relative items-center justify-center">
          <Image
            src="/images/HautParleur.AVIF "
            className="  object-cover w-auto h-auto"
            width={500}
            height={300}
            lazyloading="true"
            alt="music"
          />
          <div className="absolute top-0 h-full w-full  h-[400px]  my-auto left-0 ">
            <svg
              className="w-full h-full  opacity-75"
              viewBox="0 0 818 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.3" filter="url(#filter0_f_157_1789)">
                <ellipse cx={452} cy={250} rx={252} ry={250} fill="#D9D9D9" />
              </g>
              <defs>
                <filter
                  id="filter0_f_157_1789"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation={100}
                    className="w-full h-full"
                    result="effect1_foregroundBlur_157_1789"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
