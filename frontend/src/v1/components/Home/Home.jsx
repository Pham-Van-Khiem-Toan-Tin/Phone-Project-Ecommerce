import Caseroul from "../layouts/Caseroul";
import SliderProduct from "../layouts/SliderProduct";
import "./Home.css";
import { Data2 } from "../../../data/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
const Home = () => {
  
  
  return (
    <div className="Home">
      <Caseroul />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <div className="container">
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
        {Data2.map((data1, index) => {
          return (
            <div key={index}>
              <SwiperSlide>
                <div className="card" style={{width: "100%"}} onClick={() => {
                  console.log("Click the card")
                }}>
                  <img src={data1.img} className="card-img-top" alt={data1.title} />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
    </div>
  );
};

export default Home;
