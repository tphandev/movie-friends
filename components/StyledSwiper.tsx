"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReactNode } from "react";

export default function StyledSwiper({
  slides,
  ...restProps
}: SwiperProps & { slides: ReactNode[] }) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      pagination={{
        clickable: true,
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500",
        bulletClass: "swiper-pagination-bullet !h-3 !w-3 !mb-10 z-10",
      }}
      {...restProps}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
