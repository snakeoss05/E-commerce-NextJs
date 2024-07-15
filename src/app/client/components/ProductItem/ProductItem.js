"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addItem } from "@/lib/features/cart/cartReducer";
import Link from "next/link";
import toast from "react-hot-toast";
import { createWishlist } from "@/utils/wishlistService";
import Image from "next/image";
import QuickView from "./QuickView";
export default function ProductItem({ product }) {
  const user = useAppSelector((state) => state.auth.user);
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useAppDispatch();

  if (!product) return null; // Return null to avoid rendering anything if the product is not provided

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  function handleAddToWishlist() {
    if (!user) return toast.error("Please login to add to wishlist");
    createWishlist(product._id, user._id).then((data) => {
      toast.success("added to wishlist successfully");
    });
  }

  function calculateDiscount(price, discount) {
    const priceAfterDiscount = price - (price * discount) / 100;
    return priceAfterDiscount.toFixed(2);
  }
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800  w-full max-h-[500px]"
      key={product._id}>
      <QuickView
        product={product}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      />
      <div className="h-56 w-full flex  relative card overflow-hidden justify-center">
        <Image
          className="imagePrimary object-cover"
          src={product.image}
          width={200}
          height={300}
          alt="image1"
        />
        <Image
          className="imageSecondary object-cover"
          src={product.image2}
          width={200}
          height={300}
          alt="image2"
        />
      </div>
      <div className="flex flex-col justify-between gap-2 h-[200px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          {product.discount > 0 && (
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              Up to {product.discount}% off
            </span>
          )}
          <div className="flex items-center justify-end gap-1 ms-auto">
            <button
              type="button"
              id="tooltip-quick-look-7"
              onClick={() => setisOpen(true)}
              data-tooltip-target="tooltip-quick-look-7"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Quick look </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-quick-look-7"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top">
              Quick look
              <div className="tooltip-arrow" data-popper-arrow="" />
            </div>
            <button
              type="button"
              id="tooltip-add-to-favorites-7"
              onClick={handleAddToWishlist}
              data-tooltip-target="tooltip-add-to-favorites-7"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Add to Favorites </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-add-to-favorites-7"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top">
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow="" />
            </div>
          </div>
        </div>
        <Link
          href={`/client/pages/product/${product._id}`}
          className="text-lg block font-semibold leading-tight text-gray-900 h-12 overflow-hidden truncate hover:underline dark:text-white">
          {product.name}
        </Link>

        <ul className=" flex flex-row  justify-start gap-4">
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fast Delivery
            </p>
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Price
            </p>
          </li>
        </ul>
        <div className="flex flex-row  items-center justify-between  gap-4">
          <div className="flex flex-col items-start justify-end gap-2 h-full">
            <p
              className={`text-md sm:text-lg font-bold sm:font-extrabold leading-tight text-gray-900 dark:text-white  ${
                product.discount && "line-through"
              }`}>
              {product.price} DT
            </p>

            {product.discount > 0 && (
              <p className="text-md sm:text-lg font-bold sm:font-extrabold leading-tight text-red-500">
                {calculateDiscount(product.price, product.discount)} DT
              </p>
            )}
          </div>

          <button
            type="button"
            id="AddToCart"
            onClick={handleAddToCart}
            className="inline-flex items-center relative  rounded-lg overflow-hidden mt-auto bg-gray-950 px-3 py-2.5 text-sm text-nowrap font-medium text-white hover:before:bg-redborder-red-500 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500  hover:before:left-0 hover:before:w-full ">
            <svg
              className="m-0 sm:-ms-1 relative z-10  sm:me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            <span className="relative z-10 hidden sm:block">Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
