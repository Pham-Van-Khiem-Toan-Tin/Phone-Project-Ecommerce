import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "./SliderProduct.css";
import Card from "../Card/Card";

const SliderProduct = (props) => {
  const { data, row } = props;
  return (
    <div className="container product-slider">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        grid={row ? { rows: 2, fill: "rows" } : { rows: 1, fill: "column" }}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        modules={[Navigation, Autoplay, Grid]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {data.map((data1, index) => {
          return (
            <div key={data1.img}>
              <SwiperSlide key={index}>
                <Card data={data1} />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderProduct;
