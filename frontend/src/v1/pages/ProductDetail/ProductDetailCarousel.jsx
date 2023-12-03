import React, { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "./product-detail-carousel.css";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
const ProductDetailCarousel = ({ datas }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isBegin, setIsBegin] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const carouselRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!carouselRef.current) return;
    carouselRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!carouselRef.current) return;
    carouselRef.current.swiper.slideNext();
  }, []);
  const handleSlideChange = (swiper) => {
    setIsBegin(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <div className="detail-carousel w-100">
      <Swiper
        ref={carouselRef}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        className="image-primary rounded"
      >
        {datas &&
          datas.map((data) => (
            <SwiperSlide>
              <img src={data?.url} alt={data?.punlic_id} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="image-navigation"
      >
        {datas &&
          datas.map((data) => (
            <SwiperSlide>
              <img src={data?.url} alt={data?.punlic_id} />
            </SwiperSlide>
          ))}
      </Swiper>
      <button className={"btn prev-arrow " + (isBegin ? "disabled" : "")} onClick={handlePrev}>
        <BsChevronCompactLeft />
      </button>
      <button className={"btn next-arrow " + (isEnd ? "disabled" : "")} onClick={handleNext}>
        <BsChevronCompactRight />
      </button>
    </div>
  );
};

export default ProductDetailCarousel;
