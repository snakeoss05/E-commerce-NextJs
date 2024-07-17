import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import toast from "react-hot-toast";
import {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "@/lib/features/cart/cartReducer";
import { createWishlist } from "@/utils/wishlistService";
import { useAppSelector } from "@/lib/hooks";
export default function QuickView({ product, isOpen, onClose }) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      const item = cartItems.find((item) => item.id === product._id);
      setQuantity(item ? item.quantity : 0);
    }
  }, [product, cartItems]);

  function handlewishlist() {
    if (!user) return toast.error("Please login to add to wishlist");
    createWishlist(user._id, product._id).then((data) => {
      toast.success("added to wishlist successfully");
    });
  }

  if (!isOpen) return null;

  if (!product) {
    return (
      <div className="relative flex justify-center items-center py-8 h-screen w-screen">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <Image
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          alt="Loading"
          width={112}
          height={112}
          className="rounded-full"
        />
      </div>
    );
  }
  return (
    <div
      className="fixed top-0 left-0 flex items-center   justify-center h-screen w-screen p-4 overflow-hidden bg-black bg-opacity-50 "
      style={{ zIndex: 9999 }}>
      <div className="relative bg-white rounded-lg shadow-lg w-full sm:w-3/4 max-h-[80vh] overflow-y-auto sm:overflow-y-visible  mx-auto p-6">
        <button
          className="absolute top-4 right-4  text-gray-600 hover:text-gray-900"
          onClick={onClose}>
          &times;
        </button>

        <div className="flex flex-col lg:flex-row items-start gap-4 p-4 ">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="h-fit lg:h-[600px] bg-neutral-100 sm:flex sm:items-center p-2 lg:p-8 w-full sm:w-[600px]">
              <Image
                src={product.image}
                alt="product-image-1"
                width={600}
                height={600}
                className="h-auto w-full object-cover object-center"
              />
            </div>
            <div className="gap-4 grid grid-cols-2 lg:grid-cols-1 lg:w-[170px]">
              <div className="flex justify-center bg-neutral-100 items-center p-4">
                <Image
                  src={product.image1}
                  alt="product-image-2"
                  width={160}
                  height={180}
                  className="w-auto object-cover object-center h-auto"
                />
              </div>
              <div className="flex justify-center bg-neutral-100 items-center p-4">
                <Image
                  src={product.image2}
                  alt="product-image-3"
                  width={160}
                  height={180}
                  className="w-auto object-cover object-center h-auto"
                />
              </div>
              <div className="hidden lg:flex justify-center bg-neutral-100 items-center p-4">
                <Image
                  src={product.image3 || product.image}
                  alt="product-image-4"
                  width={160}
                  height={180}
                  className="w-auto object-cover object-center h-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4 w-full lg:w-[400px]">
            <p className="col-span-8 text-2xl font-bold text-elpsis">
              {product.name}
            </p>

            <div className="col-span-4">
              {product.stock > 0 ? (
                <p className="text-md font-bold text-green-400">In Stock</p>
              ) : (
                <p className="text-md font-bold text-red-400">Out of Stock</p>
              )}
            </div>
            <div className="col-span-8 flex flex-row justify-between items-center">
              <p className="text-2xl font-bold text-elpsis">
                {product.price} TND
              </p>
              <button className="border border-gray-300 p-2 text-sm rounded-md cursor-pointer flex flex-row items-center gap-2 hover:bg-gray-300 hover:text-white">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 22 20"
                  fill="currentcolor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="hidden sm:block" onClick={handlewishlist}>
                  Add to favorites
                </span>
              </button>
            </div>
            <div className="col-span-8 text-elpsis overflow-hidden h-fit">
              {product.description}
            </div>

            <div className="col-span-8 border-t border-gray-300 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 items-center">
                <div className="flex flex-row h-10">
                  <span
                    className="border border-gray-300 text-center h-full w-12 shadow appearance-none text-gray-400 rounded-l transition duration-300 ease-in-out hover:bg-red-500 hover:text-white px-2 py-2"
                    onClick={() => dispatch(increaseItemQuantity(product._id))}>
                    +
                  </span>

                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="border-y border-gray-300 w-16 shadow appearance-none h-full text-center px-2 py-2"
                    placeholder="1"
                  />

                  <span
                    className="border border-gray-300 h-full text-center shadow appearance-none rounded-r w-12 text-gray-400 rounded transition duration-300 ease-in-out hover:bg-red-500 hover:text-white px-2 py-2"
                    onClick={() => dispatch(decreaseItemQuantity(product._id))}>
                    -
                  </span>
                </div>
                <div className="flex flex-row h-10 ms-auto">
                  <button
                    className="inline-flex relative items-center rounded-lg mt-auto bg-gray-950 px-3 py-2 overflow-hidden border border-red-400 bg-white text-red-400 shadow-md transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-400 hover:after:w-2/4 hover:after:bg-red-400"
                    onClick={() => dispatch(addItem(product))}>
                    <svg
                      className="-ms-1 me-2 z-10  h-5 w-5"
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
                    <span className="relative z-10 hidden sm:block">
                      Add to cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
