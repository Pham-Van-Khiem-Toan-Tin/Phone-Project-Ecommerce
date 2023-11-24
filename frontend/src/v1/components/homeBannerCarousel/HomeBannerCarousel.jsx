import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./homeBannerCarousel.css";
const HomeBannerCarousel = () => {
    const [isBegin, setIsBegin] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSlideChange = (swiper) => {
    setIsBegin(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }
  return (
    <div className="home-banner-carousel">
      <Swiper
        ref={sliderRef}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="bannerSwiper"
      >
        <SwiperSlide>
          <img src="/assets/images/sliders/slider1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/sliders/slider2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/sliders/slider3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/sliders/slider3.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
      <button className="button-navigation prev-arrow" onClick={handlePrev}>
        <div className={isBegin ? "disabled" : ""}>
          <FaAngleLeft />
        </div>
      </button>
      <button className="button-navigation next-arrow" onClick={handleNext}>
        <div className={isEnd ? "disabled" : ""}>
          <FaAngleRight />
        </div>
      </button>
    </div>
  );
};

export default HomeBannerCarousel;
