import React from "react";

const Invoice = ({ invoiceData }) => {
  console.log(invoiceData);
  if (!invoiceData) return null;
  const { orderId, date, name, orderItems, shippingPrice, tax, totalPrice } =
    invoiceData;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Invoice </h1>
        <p className="text-gray-600">Invoice #: {orderId}</p>
        <p className="text-gray-600">Date: {date}</p>
        <p className="text-gray-600">Customer: {name}</p>
      </header>

      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">Item</th>
            <th className="border-b py-2 text-right">Quantity</th>
            <th className="border-b py-2 text-right">Price</th>
            <th className="border-b py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td className="border-b py-2">{item.product.name}</td>
              <td className="border-b py-2 text-right">{item.qty}</td>
              <td className="border-b py-2 text-right">
                ${item.product.price}
              </td>
              <td className="border-b py-2 text-right">
                ${item.product.price * item.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <table className="w-full max-w-xs">
          <tbody>
            <tr>
              <td className="border-b py-2 text-left">shippingPrice</td>
              <td className="border-b py-2 text-right">${shippingPrice}</td>
            </tr>
            <tr>
              <td className="border-b py-2 text-left">Tax</td>
              <td className="border-b py-2 text-right">{tax} TND</td>
            </tr>
            <tr>
              <td className="font-bold py-2 text-left">Total</td>
              <td className="font-bold py-2 text-right">{totalPrice} TND</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
