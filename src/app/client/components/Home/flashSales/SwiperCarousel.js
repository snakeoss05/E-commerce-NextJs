// components/ProductCarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductItem from "../../ProductItem/ProductItem";

const ProductCarousel = ({ products }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={30}
      autoplay={{
        delay: 3000, // milliseconds
        disableOnInteraction: false, // prevent autoplay stopping on user interaction
      }}
      slidesPerView={4}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      loop={true}
      className="mySwiper"
      navigation>
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductItem product={product} key={product._id} quickView={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
