"use client";
import React, { useState, useEffect } from "react";
import { getOrdersById, updateOrderStatus } from "@/utils/orderService";
import { useAppSelector } from "@/lib/hooks";
import StatusBadge from "./Status";
import Pagination from "@/app/client/components/Pagination/Pagination";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";
export default function MyOrder() {
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getOrdersById(user._id, page).then((data) => {
        setOrders(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
    }
  }, [user, page]);

  function handleStatusChange(orderId, status) {
    updateOrderStatus(orderId, status).then((data) => {
      if (data) {
        getOrdersById(user._id, page).then((data) => {
          setOrders(data.data);
          setTotalPages(data.totalPages);
          setLoading(false);
        });
        toast.success("Order status updated");
      }
    });
  }
  function openModal(order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="order-type"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Select order type
                </label>
                <select
                  id="order-type"
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option defaultValue>All orders</option>
                  <option value="pre-order">Pre-order</option>
                  <option value="transit">In transit</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option defaultValue>this week</option>
                  <option value="this month">this month</option>
                  <option value="last 3 months">the last 3 months</option>
                  <option value="lats 6 months">the last 6 months</option>
                  <option value="this year">this year</option>
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
              {orders &&
                orders.length > 0 &&
                orders.map((order) => (
                  <div
                    className="flex flex-wrap items-center gap-y-4 py-6"
                    key={order._id}>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base  w-16 overflow-hidden text-ellipsis font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">
                          #{order._id}
                        </a>
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {order.totalPrice}DT
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Status:
                      </dt>
                      <StatusBadge status={order.status} />
                    </dl>
                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(order._id, "cancelled")
                        }
                        aria-roledescription="cancel order"
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">
                        Cancel order
                      </button>
                      <a
                        href="#"
                        onClick={() => openModal(order._id)}
                        aria-roledescription="view details"
                        className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                        View details
                      </a>
                    </div>
                  </div>
                ))}
              {orders.length === 0 && (
                <p className="text-center text-gray-500 text-4xl py-16">
                  No orders found
                </p>
              )}
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
