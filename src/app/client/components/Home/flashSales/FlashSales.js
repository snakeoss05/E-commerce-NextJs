"use client";
import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";
import ProductItem from "../../ProductItem/ProductItem";
import Link from "next/link";
import ProductSkeleton from "../../ProductItem/ProductSkeleton";
import axios from "axios";

export default function FlashSales() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const targetDate = "2024-07-15T00:00:00";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://e-commerce-backend-dvaf.onrender.com/api/products?page=${page}&limit=4&discount=true`
        );
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    if (products.length === 0) fetchProducts();
  }, [page, products.length]);
  return (
    <div className="mx-auto py-4 lg:p-16 border-b border-gray-300 space-y-8 ">
      <div className="flex flex-row gap-2 ">
        <div className="bg-red-600 h-10 w-8 rounded-lg"></div>
        <span className="text-red-600 font-bold text-lg mt-2">Today's</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-4 ">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
          Flash Sales
        </h2>
        <Countdown targetDate={targetDate} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-8">
        {products.length > 0
          ? products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
      </div>
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
