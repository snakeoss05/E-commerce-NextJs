"use client";
import React, { useState, useEffect, useRef } from "react";
import Countdown from "./Countdown";
import Link from "next/link";
import axios from "axios";
import ProductSkeleton from "../../ProductItem/ProductSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductItem from "../../ProductItem/ProductItem";

export default function FlashSales() {
  const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const targetDate = "2024-07-28T00:00:00";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://e-commerce-backend-dvaf.onrender.com/api/products?page=${page}&limit=6&discount=true`
        );
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    if (products.length === 0) fetchProducts();
  }, [page, products.length]);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className="mx-auto py-4 lg:p-16 border-b border-gray-300 space-y-8 ">
      <div className="flex flex-row gap-2 ">
        <div className="bg-red-600 h-10 w-8 rounded-lg"></div>
        <span className="text-red-600 font-bold text-lg mt-2">Today's</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-16 ">
        <h2 className="text-2xl text-nowrap lg:text-3xl font-bold mb-2 sm:mb-4">
          Flash Sales
        </h2>
        <Countdown targetDate={targetDate} />
        <div className="flex flex-row gap-4 justify-between sm:justify-end items-center w-full px-2">
          <svg
            className="cursor-pointer bg-gray-100 p-2 h-12 w-12 text-gray-600 transition  rounded-full hover:bg-gray-200"
            viewBox="0 0 24 24"
            onClick={goPrev}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 5L4 12L11 19M4 12H20"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="cursor-pointer bg-gray-100 p-2 h-12 w-12 text-gray-600 transition  rounded-full hover:bg-gray-200"
            viewBox="0 0 24 24"
            onClick={goNext}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.5 12H20M20 12L13 5M20 12L13 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        ref={swiperRef}
        spaceBetween={30}
        autoplay={{
          delay: 3000, // milliseconds
          disableOnInteraction: false, // prevent autoplay stopping on user interaction
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={true}
        className="mySwiper"
        navigation>
        {products.length > 0
          ? products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem
                  product={product}
                  key={product._id}
                  quickView={true}
                />
              </SwiperSlide>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductSkeleton key={index} />
              </SwiperSlide>
            ))}
      </Swiper>

      <div>
        <Link href="/client/pages/product?discount=true" className="flex">
          <button
            id="viewAll"
            className="bg-red-600 text-white font-bold py-4 px-8 rounded-lg mx-auto hover:bg-red-700">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}
