import React, { forwardRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

const CustomSwiper = forwardRef((props, ref) => {
  return (
    <Swiper
      ref={ref}
      cssMode={true}
      slidesPerView={props.smSlides ?? 4}
      spaceBetween={10}
      breakpoints={{
        // Define breakpoints and options for different screen sizes
        768: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1024: {
          // slidesPerView: props.slides,
          slidesPerView: props.slides,
          spaceBetween: 10,
        },
      }}
      // grid={{
      //   rows: 2,
      // }}
      mousewheel={true}
      keyboard={true}
      modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {props.children}
    </Swiper>
  );
});

export default CustomSwiper;
