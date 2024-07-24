"use client";
import React, { useEffect, useState, useRef } from "react";
import { getOrdersByOderId } from "@/utils/orderService";
import jsPDF from "jspdf";
import Image from "next/image";
import html2canvas from "html2canvas";

export default function Invoice({ params }) {
  const [order, setOrder] = useState(null);
  const [downloaded, setDownloaded] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    getOrdersByOderId(params.orderId).then((data) => {
      setOrder(data.data[0]);
    });
  }, [params.orderId]);

  useEffect(() => {
    if (order && !downloaded) {
      const generatePDF = async () => {
        const invoiceElement = invoiceRef.current;

        // Increase the scale factor for better quality
        const scale = 2;

        const canvas = await html2canvas(invoiceElement, { scale });
        const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG for better quality

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${order._id}.pdf`);

        setDownloaded(true); // Set the flag to true after download
      };

      generatePDF();
    }
  }, [order, downloaded]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={invoiceRef}
      id="invoice"
      className="p-8 bg-white max-w-4xl mx-auto border border-gray-300 flex flex-col justify-between">
      <div className="flex justify-between flex-row">
        {" "}
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>
        <Image
          src="/images/logo.AVIF"
          width={100}
          height={100}
          alt="logo"
          className="w-20 h-20"
        />
      </div>

      <p className="mb-2">
        <strong>Order ID:</strong> {order.orderId}
      </p>
      <p className="mb-2">
        <strong>Customer:</strong> {order.fullname || order.user?.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {order.email || order.user?.email}
      </p>
      <p className="mb-2">
        <strong>Address:</strong>{" "}
        {order.address ||
          `${order.user?.address.city} ${order.user?.address.state} ${order.user?.address.street}`}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {order.phone || order.user?.address.phone}
      </p>
      <p className="mb-4">
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <table className="w-full border-collapse  mt-24 mb-4">
        <thead>
          <tr className="bg-slate-100 text-gray-500  p-2">
            <th className=" p-2 text-left">Product</th>
            <th className=" p-2 text-left text-center">Quantity</th>
            <th className=" p-2 text-center ">Price</th>
            <th className=" p-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item) => (
            <tr key={item._id}>
              <td className="text-left p-2 w-64 ">{item.product.name}</td>
              <td className="text-center p-2">{item.qty}</td>
              <td className="text-center p-2">{item.product.price} TND</td>
              <td className="text-center p-2">
                {item.qty * item.product.price} TND
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-64 mb-4">
        <p className="mb-1 text-gray-400">
          Shipping Price:<strong>{order.shippingPrice} TND</strong>
        </p>
        <p className="mb-1 text-gray-400">
          Tax: <strong>{order.tax} TND</strong>
        </p>

        <p className="text-md font-semibold">
          <strong>Total:</strong> {order.totalPrice} TND
        </p>
      </div>
    </div>
  );
}
