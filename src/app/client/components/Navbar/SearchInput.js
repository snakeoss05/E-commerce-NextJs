"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
export default function SearchInput() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      if (name.length > 2)
        try {
          const res = await axios.get(
            `/api/products/search?page=1&limit=8&name=${name}`
          );
          setProducts(res.data.data);
          if (res.data.data.length > 0) setIsOpen(true);
        } catch (error) {
          console.log(error);
        }
      else {
        setIsOpen(false);
      }
    };

    fetchProducts();
  }, [name]);
  return (
    <div className={` left-0 sm:left-auto  bg-white lg:block w-full  mx-2 `}>
      <div className="relative lg:block w-full ">
        <div>
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for..."
            className="w-full rounded-md border-gray-200 py-1.5 sm:py-2.5 pe-10 ps-4 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              id="search"
              type="button"
              className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>

        {isOpen && (
          <div
            className={`absolute top-full   w-full z-50 bg-white rounded-sm  border-b-4 border-red-200  shadow-lg transition duration-300 ease-in-out opacity-0 ${
              isOpen ? "opacity-100" : ""
            }`}>
            <div className="flex items-center justify-between p-2 sm:p-4">
              <p className="text-sm text-gray-400 text-nowrap">
                Résults of search : ({products.length})
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500 cursor-pointer hover:text-red-500"
                viewBox="0 0 384 512"
                onClick={() => setIsOpen(false)}
                fill="currentColor">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>

            <div className="flex flex-col gap-4 h-[400px] overflow-y-auto  w-full  p-2">
              {products.length > 0 &&
                products.map((product) => (
                  <Link
                    href={`/client/pages/product/${product._id}`}
                    key={product._id}>
                    <div className="grid grid-cols-1 gap-2 hover:bg-gray-100 h-[155px] overflow-hidden p-2 cursor-pointer transition-all duration-300 rounded-lg">
                      <div className="flex justify-center items-center  p-2">
                        <Image
                          width={100}
                          height={100}
                          src={product.image}
                          className="rounded-lg w-auto h-16 object-cover"
                          alt="music"
                        />
                      </div>

                      <div className="flex flex-col justify-between py-2 gap-2  ">
                        <p className="text-sm  truncate text-primary-500">
                          {product.name}
                        </p>
                        <div className="flex flex-row justify-between items-center ">
                          <p className="text-sm">{product.price}DT</p>
                          {product.stock > 0 ? (
                            <p className="text-sm text-green-400">In Stock</p>
                          ) : (
                            <p className="text-sm text-red-400">Out of Stock</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`absolute block top-full  w-screen  bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out  left-0 ${
          isOpen ? "opacity-100 h-[calc(100vh-100px)]" : "opacity-0 h-0"
        }`}
        onClick={() => setIsOpen(false)}></div>
    </div>
  );
}
