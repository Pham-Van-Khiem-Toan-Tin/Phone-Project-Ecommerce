import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid } from "swiper";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "./techDealCarousel.css";
import CardTechDeal from "../CardTechDeal/CardTechDeal";

const TechDealCarousel = (props) => {
  const { datas, row } = props;
  return (
    <div className="product-carousel">
      <div className="product-carousel-title d-flex align-items-center justify-content-between">
        <span>
          Grab the best deal on <span>SamSung</span>
        </span>
        <Link to="/categories">
          View All <FaAngleRight />
        </Link>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        grid={row ? { rows: 2, fill: "rows" } : { rows: 1, fill: "column" }}
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
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {datas &&
          datas.map((data) => {
            return (
              data && (
                <div key={data._id}>
                  <SwiperSlide key={data._id}>
                    <CardTechDeal data={data}/>
                  </SwiperSlide>
                </div>
              )
            );
          })}
      </Swiper>
    </div>
  );
};

export default TechDealCarousel;
