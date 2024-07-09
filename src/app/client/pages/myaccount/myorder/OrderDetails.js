import React, { useState, useEffect } from "react";
import { getOrdersProducts } from "@/utils/orderService";
import Image from "next/image";
export default function OrderDetails({ orderId, isOpen, onClose }) {
  if (!isOpen) return null;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrdersProducts(orderId).then((data) => {
        setOrder(data.data);
        setLoading(false);
      });
    }
  }, [orderId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center p-4 overflow-auto bg-black bg-opacity-50">
      {loading && (
        <div className="flex space-x-2 justify-center items-center  bg-white py-16 sm:py-64 dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      )}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto p-6">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <div>
          <h3 className="text-lg font-medium mb-2">Items Purchased</h3>
          <ul className="space-y-2">
            {order?.orderItems.map((item) => (
              <li
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between border-b py-2">
                <div className="flex flex-row items-center justify-between w-full sm:w-1/4">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 mx-auto object-cover"
                    width={50}
                    height={50}
                  />
                </div>

                <div className="flex flex-col w-full sm:w-1/3">
                  <span>{item.product.name}</span>
                  <span>{item.product.price.toFixed(2)} DT</span>
                </div>
                <span>{item.qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <div className="flex justify-between font-medium">
              <span>Total Price:</span>
              <span>{order?.totalPrice.toFixed(2)} DT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
