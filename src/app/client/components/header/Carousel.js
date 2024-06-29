"use client";
import React, { useState, useEffect } from "react";

export default function Carousel() {
  const images = [
    "/images/iphone.png",
    "https://via.placeholder.com/600x400?text=Slide+2",
    "https://via.placeholder.com/600x400?text=Slide+3",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 50000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  return (
    <div className="relative w-full  mx-auto h-96 overflow-hidden">
      <div className="overflow-hidden rounded-lg shadow-lg w-full h-full ">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center mt-4 space-x-4 tranform -translate-y-16">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${
              currentIndex === index
                ? "bg-red-500 border border-white"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
