"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Carousel() {
  const images = [
    "/images/iphone.AVIF",
    "/images/banner_17042680256ee3708ef2c49ead7159393c7e27c16c.AVIF",
    "/images/banner_1695693289ebeb1f0bb341626b2d0bf870d3cb9254.AVIF",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [nextSlide]);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="overflow-hidden rounded-lg shadow-lg w-full h-full">
        <Image
          src={images[currentIndex]}
          width={1300}
          height={700}
          className="h-64 w-full lg:h-96 lg:w-[1300px] object-cover"
          priority
          alt={`Slide ${currentIndex + 1}`}
        />
      </div>

      <div className="flex absolute justify-center mt-4 space-x-4 bottom-4 left-1/2">
        {images.map((_, index) => (
          <button
            aria-label={`Slide ${index + 1}`}
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
