import SliderProduct from "../../components/layouts/SliderProduct";
import "./Home.css";
import { Data2, Data3, DATA4 } from "../../../data/Data";
import {
  FaShippingFast,
  FaHandsHelping,
  FaUserCog,
  FaFireAlt,
} from "react-icons/fa";
import CountdownTimer from "../../components/CountDown/CountDown";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearError } from "../../reduxToolkit/reducer/product/productsHomeSlice";
import { getHotProduct } from "../../reduxToolkit/actions/productAction";
const Home = () => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  const dispatch = useDispatch();
  const { isLoading, error, ssproducts, xiaoproducts, approducts, opproducts } =
    useSelector((state) => state.productshome);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }
    dispatch(getHotProduct());
  }, [dispatch, error, toast]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Home" style={{ width: "100vw" }}>
          <div className="banner-slider container">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="Bannerswiper"
            >
              <SwiperSlide>
                <img src="/assets/images/sliders/slider1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/images/sliders/slider2.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/images/sliders/slider3.jpg" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="container banner-img"><img src="assets/images/sliders/banner.webp" /></div>
          <div className="container mt-2">
            <div className="row">
              <div className="col">
                <FaShippingFast
                  className="d-block fs-1 mx-auto"
                  style={{ color: "#ffff" }}
                />
                <p
                  className="fs-3 text-center fw-bold"
                  style={{ color: "#ffff" }}
                >
                  Giao hàng nhanh
                </p>
              </div>
              <div
                className="col"
                style={{
                  borderLeft: "1px solid #ffff",
                  borderRight: "1px solid #ffff",
                }}
              >
                <FaHandsHelping
                  className="d-block fs-1 mx-auto"
                  style={{ color: "#ffff" }}
                />
                <p
                  className="fs-3 text-center fw-bold"
                  style={{ color: "#ffff" }}
                >
                  Hỗ trợ trả góp
                </p>
              </div>
              <div className="col">
                <FaUserCog
                  className="d-block fs-1 mx-auto"
                  style={{ color: "#ffff" }}
                />
                <p
                  className="fs-3 text-center fw-bold"
                  style={{ color: "#ffff" }}
                >
                  Bảo hành lâu dài
                </p>
              </div>
            </div>
          </div>
          <div className="container hot_sale">
            <div className="hot_sale_header d-flex flex-row flex-wrap">
              <div className="hot_sale-button d-flex flex-md-row flex-column align-items-center justify-content-center">
                <button className="p-0">Điện thoại</button>
                <button className="p-0">Phụ kiện</button>
              </div>
              <div className="mx-auto hot_sale-content">
                Hot sale tuần này <FaFireAlt />
              </div>
              <div className="hot_sale-timeCountDown d-flex flex-md-row flex-column align-items-center justify-content-center">
                <span className="fs-5 fw-bold">Kết thúc sau: </span>
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              </div>
            </div>
            <div className="hot_sale-slider">
              <SliderProduct data={opproducts} />
            </div>
          </div>
          <div className="container hot pt-2 d-flex flex-row justify-content-between align-items-center">
            <h3 className="text-uppercase">Điện thoại Apple</h3>
            <button>Xem tiếp</button>
          </div>
          <SliderProduct data={approducts} />
          <div className="container hot pt-2 d-flex flex-row justify-content-between align-items-center">
            <h3 className="text-uppercase">Điện thoại samsung</h3>
            <button>Xem tiếp</button>
          </div>
          <SliderProduct data={ssproducts} row={2} />
          <div className="container hot pt-2 d-flex flex-row justify-content-between align-items-center">
            <h3 className="text-uppercase">Điện thoại xiaomi</h3>
            <button>Xem tiếp</button>
          </div>
          <SliderProduct data={xiaoproducts} />
          <img src="" />
        </div>
      )}
    </>
  );
};

export default Home;
