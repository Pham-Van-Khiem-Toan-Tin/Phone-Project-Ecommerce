import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./carousel.css";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const Carousel = ({
  ChildComponent,
  datas,
  row,
  responsive,
  modules,
  title,
  titleName,
  content
}) => {
  const moduleAccess = [];
  for (let i = 0; i < modules.length; i++) {
    if (modules[i] === "Navigation") moduleAccess.push(Navigation);
    if (modules[i] === "Autoplay") moduleAccess.push(Autoplay);
    if (modules[i] === "Grid") moduleAccess.push(Grid);
    if (modules[i] === "Pagination") moduleAccess.push(Pagination);
  }
  return (
    <div className="carousel-swiper">
      {title && (
        <div className="carousel-swiper-title d-flex align-items-center justify-content-between">
          <span className="title-content">
            {content} <span>{titleName}</span>
            <div className="line"></div>
          </span>
          <Link to="/categories">
            View All <FaAngleRight />
          </Link>
        </div>
      )}
      {console.log(moduleAccess)}
      {console.log(modules.includes("Navigation"))}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        grid={row ? { rows: 2, fill: "rows" } : { rows: 1, fill: "column" }}
        pagination={modules.includes("Pagination")}
        navigation={modules.includes("Navigation")}
        breakpoints={responsive}
        modules={moduleAccess}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {datas &&
          datas.map((data, index) => {
            return (
              data && (
                <div key={data._id}>
                  <SwiperSlide key={data?._id ? data.id : index}>
                    <ChildComponent data={data} />
                  </SwiperSlide>
                </div>
              )
            );
          })}
      </Swiper>
    </div>
  );
};

export default Carousel;
