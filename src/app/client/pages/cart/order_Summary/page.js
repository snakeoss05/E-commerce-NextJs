"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function OrderSummary() {
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalSaving = useAppSelector((state) => state.cart.totalSaving);
  const totalFinal = useAppSelector((state) => state.cart.totalFinal);
  const includeDeliveryFee = useAppSelector(
    (state) => state.cart.includeDeliveryFee
  );
  useEffect(() => {
    setIsMounted(true);
  }, []);
  async function createOrder() {
    const filterCartItems = cart.map((item) => ({
      product: item.id,
      qty: item.quantity,
    }));

    const data = {
      user: user._id,
      orderItems: filterCartItems,
      phone: user.address.phone,
      fullname: user.address.name,
      email: user.address.email,
      address:
        user.address.state +
        " " +
        user.address.city +
        " " +
        user.address.street,
      cart: cart,
      totalPrice: totalFinal,
      paymentMethod: includeDeliveryFee ? "cash on delivery" : "cash on store",
      shippingPrice: includeDeliveryFee ? 7 : 0,
      tax: 1,
    };
    try {
      const response = await axios.post(
        "https://e-commerce-backend-dvaf.onrender.com /api/orders",
        data
      );
      if (response.status === 201) {
        toast.success("Thanks for your purchase, we're getting it ready!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  if (!isMounted) return null;
  return (
    <div className="flex flex-col items-center justify-center ">
      <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base my-8">
        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
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
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Cart
          </span>
        </li>
        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
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
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Checkout
          </span>
        </li>
        <li className="flex shrink-0 items-center text-primary-700">
          <svg
            className="me-2 h-4 w-4 sm:h-5 sm:w-5"
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
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Order summary
        </li>
      </ol>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order summary
            </h2>
            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Billing &amp; Delivery information
              </h4>

              <dl>
                <dt className="text-base font-medium text-gray-900 dark:text-white">
                  Individual
                </dt>
                {user.address?.city},{user.address?.state}{" "}
                {user.address?.street}
              </dl>
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white ">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {cart.length > 0 &&
                      cart.map((item) => (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap py-4 md:w-full">
                            <div className="flex items-center gap-4">
                              <a
                                href="#"
                                className="flex items-center aspect-square w-10 h-10 shrink-0">
                                <Image
                                  width={40}
                                  height={40}
                                  className="h-auto w-full max-h-full dark:hidden"
                                  src={item.image}
                                  alt="imac image"
                                />
                              </a>
                              <a
                                href="#"
                                className="hover:underline truncate w-16">
                                {item.name}
                              </a>
                            </div>
                          </td>
                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.quantity}
                          </td>
                          <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                            {item.price.toFixed(2)} TND
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-6  text-nowrap">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {totalAmount.toFixed(2)} TND
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        {totalSaving.toFixed(2)} TND
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {totalAmount - totalSaving.toFixed(2)}
                      </dd>
                    </dl>

                    {includeDeliveryFee && (
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery fee
                        </dt>
                        <dd className="text-base font-medium text-primary-500">
                          7 DT
                        </dd>
                      </dl>
                    )}
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        1 TND
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      {totalFinal.toFixed(2)} TND
                    </dd>
                  </dl>
                </div>

                <div className="gap-4 sm:flex sm:items-center">
                  <button
                    type="button"
                    aria-roledescription="return to shopping"
                    onClick={() => router.push("/")}
                    className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                    Return to Shopping
                  </button>
                  <button
                    type="button"
                    aria-roledescription="send the order"
                    onClick={createOrder}
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">
                    Send the order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      {orderConfirmation && (
        <div className="rounded-3xl shadow-2xl my-10 ">
          <div className="p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
              Your order is on the way
            </p>

            <h2 className="mt-6 text-3xl font-bold">
              Thanks for your purchase, we're getting it ready!
            </h2>

            <Link
              className="mt-8 inline-block w-full rounded-full bg-blue-500 py-4 text-sm font-bold text-white shadow-xl"
              href="/client/pages/myaccount/myorder">
              Track Order
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
