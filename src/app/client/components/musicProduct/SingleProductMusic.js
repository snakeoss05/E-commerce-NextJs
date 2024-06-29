import React from "react";

export default function SingleProductMusic() {
  return (
    <div className="px-4 hidden lg:block lg:px-24 h-[500px] relative ">
      <img
        src="/images/music.png"
        className="w-full h-full object-cover rounded-lg"
        alt="music"
      />
      <div className="absolute top-0 h-full w-full left-0 px-4 lg:px-24 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex px-16 pb-8">
          <button className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-600 mt-auto">
            Buy Now
          </button>
        </div>
        <div className="flex ">
          <img
            src="/images/HautParleur.png"
            className="w-[600px] h-[400px] me-auto my-auto"
            alt="music"
          />
        </div>
      </div>
    </div>
  );
}
