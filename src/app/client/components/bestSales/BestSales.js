import React from "react";
import ProductItem from "../ProductItem/ProductItem";
export default function BestSales() {
  return (
    <div className="mx-auto py-8 lg:p-24  space-y-8  ">
      <div className="flex flex-row gap-2 ">
        <div className="bg-red-500 h-10 w-8 rounded-lg"></div>
        <span className="text-red-500 font-bold text-lg mt-2">This Month</span>
      </div>
      <h1 className="text-3xl font-bold">Best Selling Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-8">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
      <div className="flex">
        <button className="bg-red-500 text-white font-bold py-4 px-8 rounded-lg mx-auto hover:bg-red-600">
          View All Products
        </button>
      </div>
    </div>
  );
}
