// src/components/OffcanvasCart.js
"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  closeCart,
} from "@/lib/features/cart/cartReducer";
import Link from "next/link";
export default function OffcanvasCart() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalFinal = useAppSelector((state) => state.cart.totalFinal);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalSaving = useAppSelector((state) => state.cart.totalSaving);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg  transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 9999 }}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-medium">Your Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4 overflow-y-auto  h-[calc(100vh-300px)]">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-between py-2 border-b gap-2 border-gray-200">
                <div className="flex items-center flex-row justify-start gap-2 w-full px-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-2"
                  />
                  <h3 className="text-sm font-medium">{item.name}</h3>
                </div>
                <div className="flex items-center justify-between w-full px-4">
                  <p className="text-md text-gray-500">{item.price} DT</p>
                  <div className="flex items-center ">
                    <button
                      onClick={() => dispatch(decreaseItemQuantity(item.id))}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded-l">
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseItemQuantity(item.id))}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded-r">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center my-auto">
              Your cart is empty.
            </p>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 ">
          <div className="flex justify-between">
            <span>Original Price:</span>
            <span>{totalAmount.toFixed(2)} DT</span>
          </div>
          <div className="flex justify-between">
            <span>Savings:</span>
            <span>-{totalSaving && totalSaving.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>TVA:</span>
            <span>1 DT</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{totalFinal.toFixed(2)} DT</span>
          </div>
        </div>
        <Link
          href="/client/pages/cart/checkout"
          className="w-full p-4 bg-blue-500 text-white hover:bg-blue-600 sm:mt-8 block text-center">
          Checkout
        </Link>
      </div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(closeCart())}></div>
    </>
  );
}
