"use client";

import React, { useState, useEffect } from "react";
import ProductItem from "../../ProductItem/ProductItem";
import axios from "axios";
import ProductSkeleton from "../../ProductItem/ProductSkeleton";
export default function BestSales() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products?page=${page}&limit=4`);
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page]);
  return (
    <div className="mx-auto py-8 lg:p-24  space-y-8  ">
      <div className="flex flex-row gap-2 ">
        <div className="bg-red-600 h-10 w-8 rounded-lg"></div>
        <span className="text-red-600 font-bold text-lg mt-2">This Month</span>
      </div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Best Selling Products</h1>
        <button
          id="viewAll"
          className="bg-red-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-700">
          View All Products
        </button>
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
    </div>
  );
}
