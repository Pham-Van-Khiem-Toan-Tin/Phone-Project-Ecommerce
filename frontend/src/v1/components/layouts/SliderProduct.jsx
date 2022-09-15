import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./SliderProduct.css";

const  SliderProduct = (props) => {
  const { data } = props;
  return (
    <div className="container product-slider">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {data.map((data1, index) => {
          return (
            <div key={data1.img}>
              <SwiperSlide key={index}>
                <div className="card" style={{width: "100%"}}>
                  <img src={data1.img} className="card-img-top" alt={data1.title} />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderProduct;
