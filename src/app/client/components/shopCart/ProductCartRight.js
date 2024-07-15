import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
export default function ProductCartRight({
  item,
  decreaseItemQuantity,
  increaseItemQuantity,
}) {
  const dispatch = useDispatch();
  return (
    <div
      key={item.id}
      className="flex flex-col items-center justify-between py-2 border-b gap-2 border-gray-200">
      <div className="flex items-center flex-row justify-start gap-2 w-full px-2">
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
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
  );
}
