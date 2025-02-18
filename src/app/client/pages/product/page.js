"use client";
import React, { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import Filter from "../../components/filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import ProductSkeleton from "../../components/ProductItem/ProductSkeleton";
import axios from "axios";

export default function Products() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [discount, setDiscounts] = useState(
    searchParams.get("discount") || false
  );
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [markList, setMarkList] = useState([]);
  const [stock, setStock] = useState("");
  const [mark, setMark] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState(""); // New state for sorting
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "8",
        discount: discount,
        category: category ?? "",
        minPrice: minPrice !== "" ? minPrice : "",
        maxPrice: maxPrice !== "" ? maxPrice : "",
        stock: stock !== "" ? stock : "",
        mark: mark !== "" ? mark : "",
        sortField: sortField || "", // Include sorting field
        sortOrder: sortOrder || "", // Include sorting order
      });

      try {
        const res = await axios.get(
          `https://e-commerce-backend-dvaf.onrender.com/api/products?${queryParams.toString()}`
        );
        setIsLoading(false);
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
        setMarkList([
          ...new Set(
            res.data.data.map((product) => product.mark).filter(Boolean)
          ),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [
    page,
    discount,
    category,
    minPrice,
    maxPrice,
    stock,
    mark,
    sortField,
    sortOrder,
  ]);

  const handleDelete = async (id) => {
    const res = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setProducts(products.filter((product) => product._id !== id));
    } else {
      console.error("Failed to delete product");
    }
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 relative lg:gap-8 my-4 px-4 sm:px-8">
      <div className="flex items-center space-x-4 ms-auto relative">
        <button
          id="sortDropdownButton1"
          onClick={() => setIsOpen(!isOpen)}
          data-dropdown-toggle="dropdownSort1"
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
          <svg
            className="-ms-0.5 me-2 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
            />
          </svg>
          Sort
          <svg
            className="-me-0.5 ms-2 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </button>
        <div
          onMouseLeave={() => setIsOpen(false)}
          id="dropdownSort1"
          className={`origin-top-left absolute w-40 right-0 mt-2 top-full z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition ease-out duration-300 ${
            isOpen
              ? " transform block opacity-100 "
              : "transform hidden opacity-0 "
          }`}
          data-popper-placement="bottom">
          <ul
            className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
            aria-labelledby="sortDropdownButton">
            <li>
              <button
                onClick={() => handleSortChange("createdAt", "desc")}
                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                Newest
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSortChange("price", "asc")}
                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                Increasing price
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSortChange("price", "desc")}
                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                Decreasing price
              </button>
            </li>
            <li>
              <button
                onClick={() => setDiscounts(true)}
                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                Discount %
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
        <div className="rounded-lg px-0 sm:px-4">
          <Filter
            mark={mark}
            setMark={setMark}
            stock={stock}
            setStock={setStock}
            maxPrice={maxPrice}
            MarkList={markList}
            minPrice={minPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        </div>
        <div className="rounded-lg lg:col-span-4 gap-4">
          <div className="mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center w-full flex justify-center items-center col-span-4 h-96">
                <p className="text-3xl text-gray-400 ">No products found</p>
              </div>
            )}
            {isLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}
