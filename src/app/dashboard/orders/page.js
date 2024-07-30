"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getOrders,
  updateOrderStatus,
  DeleteOrder,
  getOrdersByOderId,
  generateInvoice,
} from "@/utils/orderService";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import StatusBadge from "@/app/client/pages/myaccount/myorder/Status";
import Pagination from "@/app/client/components/Pagination/Pagination";
import toast from "react-hot-toast";
import OrderDetails from "@/app/client/pages/myaccount/myorder/OrderDetails";

export default function MyOrder() {
  const isAuth = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [OrderIdInput, setOrderIdInput] = useState("");
  const [status, setStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth) {
      getOrders(page, orderDate, status).then((data) => {
        setLoading(false);
        setOrders(data.data);
        setTotalPages(data.totalPages);
      });
    }
  }, [isAuth, page, orderDate, status]);

  function handleStatusChange(orderId, status) {
    updateOrderStatus(orderId, status).then((data) => {
      if (data) {
        getOrders(page, orderDate, status).then((data) => {
          setLoading(false);
          setOrders(data.data);
          setTotalPages(data.totalPages);
        });
        toast.success("Order status updated");
      }
    });
  }
  function handleDelete(orderId) {
    DeleteOrder(orderId).then((data) => {
      if (data) {
        getOrders(page, orderDate, status).then((data) => {
          setLoading(false);
          setOrders(data.data);
          setTotalPages(data.totalPages);
        });
        toast.success("Order deleted");
      }
    });
  }
  function handleOrderSearch() {
    getOrdersByOderId(OrderIdInput).then((data) => {
      setLoading(false);
      setOrders(data.data);
    });
  }
  function openModal(order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 ">
      <div className="me-auto max-w-screen-xl px-4 ">
        <div className="mx-auto max-w-7xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Orders List
            </h2>
            <div className="ms-auto relative">
              <label htmlFor="Search" className="sr-only">
                Search
              </label>

              <input
                type="text"
                id="Search"
                value={OrderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Search By Order Id"
                className="w-full rounded-md border-gray-200 bg-gray-100 py-1.5 sm:py-2.5 pe-10 ps-4 shadow-sm sm:text-sm focus-visible:outline-none"
              />
              <span className="absolute bg-black  rounded-r-lg inset-y-0 end-0 grid w-10 place-content-center">
                <button id="search" type="button" onClick={handleOrderSearch}>
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6  text-gray-100 ">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="order-type"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Select order type
                </label>
                <select
                  id="order-type"
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full min-w-[8rem] rounded-lg border capitalize border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option defaultValue>All orders</option>
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="declined">declined</option>
                  <option value="processing">processing</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                  <option value="returned">returned</option>
                </select>
              </div>
              <span className="inline-block text-gray-500 dark:text-gray-400">
                {" "}
                from{" "}
              </span>
              <div>
                <label
                  htmlFor="duration"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Select duration
                </label>
                <select
                  id="duration"
                  onChange={(e) => setOrderDate(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option defaultValue>this week</option>
                  <option value="today">today</option>
                  <option value="this_week">this week</option>
                  <option value="this_month">this month</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading && (
                <div className="flex space-x-2 justify-center items-center bg-white py-16 sm:py-64 dark:invert">
                  <span className="sr-only">Loading...</span>
                  <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
                </div>
              )}

              <div className="overflow-x-auto mb-16">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        OrderID
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Customer Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Date
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Price
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Items
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Methode
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Actions
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {orders?.length > 0 &&
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-500">
                            #{order.orderId}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                            {order.user?.name || order.fullname}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                            {order.totalPrice} TND
                          </td>

                          <td className="whitespace-nowrap px-4 py-2">
                            <button
                              onClick={() => openModal(order._id)}
                              className="inline-block rounded bg-primary-500 px-4 py-2 text-xs font-medium text-white hover:bg-primary-600">
                              View
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                            {order.paymentMethod}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 w-40">
                            <StatusBadge status={order.status} />
                          </td>

                          <td className="whitespace-nowrap px-4 py-2 flex items-center justify-center flex-row gap-4 ">
                            <svg
                              className="h-6 w-6 text-red-500 transition cursor-pointer duration-200 ease-in hover:scale-125"
                              onClick={() => handleDelete(order._id)}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="#ff0000">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M20.5001 6H3.5"
                                  stroke="#e00000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />{" "}
                                <path
                                  d="M9.5 11L10 16"
                                  stroke="#e00000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />{" "}
                                <path
                                  d="M14.5 11L14 16"
                                  stroke="#e00000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />{" "}
                                <path
                                  d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                  stroke="#e00000"
                                  strokeWidth="1.5"
                                />{" "}
                                <path
                                  d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                                  stroke="#e00000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />{" "}
                              </g>
                            </svg>
                            <svg
                              className="h-6 w-6 transition cursor-pointer duration-200 
                              ease-in hover:scale-125"
                              viewBox="0 0 24 24"
                              onClick={() =>
                                router.push(
                                  `/dashboard/invoice/${order.orderId}`
                                )
                              }
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M7 18H6.2C5.0799 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V10.2C3 9.0799 3 8.51984 3.21799 8.09202C3.40973 7.71569 3.71569 7.40973 4.09202 7.21799C4.51984 7 5.0799 7 6.2 7H7M17 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V10.2C21 9.07989 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H17M7 11H7.01M17 7V5.4V4.6C17 4.03995 17 3.75992 16.891 3.54601C16.7951 3.35785 16.6422 3.20487 16.454 3.10899C16.2401 3 15.9601 3 15.4 3H8.6C8.03995 3 7.75992 3 7.54601 3.10899C7.35785 3.20487 7.20487 3.35785 7.10899 3.54601C7 3.75992 7 4.03995 7 4.6V5.4V7M17 7H7M8.6 21H15.4C15.9601 21 16.2401 21 16.454 20.891C16.6422 20.7951 16.7951 20.6422 16.891 20.454C17 20.2401 17 19.9601 17 19.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H8.6C8.03995 15 7.75992 15 7.54601 15.109C7.35785 15.2049 7.20487 15.3578 7.10899 15.546C7 15.7599 7 16.0399 7 16.6V19.4C7 19.9601 7 20.2401 7.10899 20.454C7.20487 20.6422 7.35785 20.7951 7.54601 20.891C7.75992 21 8.03995 21 8.6 21Z"
                                  stroke="#000000"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                              </g>
                            </svg>
                            <svg
                              fill="currentColor"
                              version="1.1"
                              onClick={() =>
                                handleStatusChange(order._id, "confirmed")
                              }
                              className="h-6 w-6 text-primary-500 transition cursor-pointer duration-200 ease-in hover:scale-125"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="64px"
                              height="64px"
                              viewBox="0 0 98.25 98.25"
                              xmlSpace="preserve"
                              stroke="#04e600">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M49.125,0C22.037,0,0,22.038,0,49.125S22.037,98.25,49.125,98.25S98.25,76.212,98.25,49.125S76.213,0,49.125,0z M49.125,88.25C27.551,88.25,10,70.699,10,49.125S27.551,10,49.125,10S88.25,27.551,88.25,49.125S70.699,88.25,49.125,88.25z" />{" "}
                                    <path d="M77.296,33.027L71.02,26.75c-0.442-0.442-1.227-0.442-1.668,0L39.67,56.432L28.898,45.661 c-0.441-0.442-1.225-0.442-1.668,0l-6.276,6.276c-0.222,0.222-0.346,0.521-0.346,0.834c0,0.313,0.124,0.613,0.346,0.834 l17.882,17.881c0.23,0.229,0.531,0.346,0.834,0.346c0.301,0,0.604-0.115,0.834-0.346l36.792-36.792 c0.222-0.221,0.347-0.521,0.347-0.834S77.518,33.248,77.296,33.027z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                            <svg
                              className="h-6 w-6 text-red-500 transition cursor-pointer duration-200 ease-in hover:scale-125"
                              viewBox="0 0 512 512"
                              onClick={() =>
                                handleStatusChange(order._id, "declined")
                              }
                              version="1.1"
                              xmlSpace="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              fill="currentColor"
                              stroke="#bd0000">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <style
                                  type="text/css"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      " .st0{fill:#800000;} .st1{fill:none;stroke:#800000;stroke-width:32;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} ",
                                  }}
                                />{" "}
                                <g id="Layer_1" />{" "}
                                <g id="Layer_2">
                                  {" "}
                                  <g>
                                    {" "}
                                    <path
                                      className="st0"
                                      d="M263.24,43.5c-117.36,0-212.5,95.14-212.5,212.5s95.14,212.5,212.5,212.5s212.5-95.14,212.5-212.5 S380.6,43.5,263.24,43.5z M367.83,298.36c17.18,17.18,17.18,45.04,0,62.23v0c-17.18,17.18-45.04,17.18-62.23,0l-42.36-42.36 l-42.36,42.36c-17.18,17.18-45.04,17.18-62.23,0v0c-17.18-17.18-17.18-45.04,0-62.23L201.01,256l-42.36-42.36 c-17.18-17.18-17.18-45.04,0-62.23v0c17.18-17.18,45.04-17.18,62.23,0l42.36,42.36l42.36-42.36c17.18-17.18,45.04-17.18,62.23,0v0 c17.18,17.18,17.18,45.04,0,62.23L325.46,256L367.83,298.36z"
                                    />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {orders.length === 0 && (
                  <div className="w-full">
                    <p className="text-center w-full text-gray-500 text-4xl py-16">
                      No orders found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <OrderDetails
            orderId={selectedOrder}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </section>
  );
}
