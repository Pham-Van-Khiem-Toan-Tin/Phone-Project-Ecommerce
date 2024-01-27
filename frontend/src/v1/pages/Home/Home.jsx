import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import {  useEffect  } from "react";
import { clearError } from "../../reduxToolkit/reducer/product/productsHomeSlice";
import { getHotProduct } from "../../reduxToolkit/actions/productAction";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import { Link } from "react-router-dom";
import HomeBannerCarousel from "../../components/homeBannerCarousel/HomeBannerCarousel";
import Carousel from "../../components/Carousel/Carousel";

import Card from "../../components/Card/Card";
import CardTechDeal from "../../components/CardTechDeal/CardTechDeal";
import CardBrand from "../../components/CardBrand/CardBrand";
import { dataTech } from "../../../data/imgTest/data";
import { dataBrand } from "../../../data/imgTest/brandData";
import { clearErrorWish, resetToWish } from "../../reduxToolkit/reducer/wish/wish.slice";
const Home = ({HeaderComponent, FooterComponent}) => {
  const dispatch = useDispatch();
  const { isLoading, error, ssproducts, xiaoproducts, approducts, opproducts } =
    useSelector((state) => state.productshome);
  const { error: errorCart, success: successCart } = useSelector(
    (state) => state.cart
  );
  const { error: errorWish, success: successWish } = useSelector(
    (state) => state.wish
  );
  const hotProductResponsive = {
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
  }
  const hotProductModule = [ "Autoplay", "Grid"];
  const techResponsive = {
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
  }
  const techModule = ["Autoplay", "Grid"];
  
  const brandResponsive = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
  }
  const brandModule = ["Autoplay", "Grid", "Pagination"];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }
    if (errorCart) {
      toast.error(errorCart);
      dispatch(clearErrorCart());
    }
    if (successCart) {
      toast.success(successCart);
      dispatch(resetToCart());
    }
    if (errorWish) {
      toast.error(errorWish);
      dispatch(clearErrorWish());
    }
    if (successWish) {
      toast.success(successWish);
      dispatch(resetToWish());
    }
  }, [dispatch, error, errorCart, successCart, errorWish, successWish]);
  useEffect(() => {
    dispatch(getHotProduct());
  }, [dispatch]);
  return (
    <>
    <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Home">
          <div className="container">
            <HomeBannerCarousel />
            <Carousel ChildComponent={Card} content="Best grab on the deal" titleName={"Iphone"} title={true} datas={approducts} responsive={hotProductResponsive} modules={hotProductModule} />
            <Carousel ChildComponent={Card} content="Best grab on the deal" titleName={"Samsung"} title={true} datas={ssproducts} responsive={hotProductResponsive} modules={hotProductModule} />
            <Carousel ChildComponent={Card} content="New product" titleName={"Xiaomi"} title={true} datas={xiaoproducts} responsive={hotProductResponsive} modules={hotProductModule} />
            <Carousel ChildComponent={CardTechDeal} content="Best deal" titleName={"Tech"} title={true} datas={dataTech} responsive={techResponsive} modules={techModule} />
            <Carousel ChildComponent={CardBrand} content="Best deal" titleName={"Brand"} title={true} datas={dataBrand} responsive={brandResponsive} modules={brandModule} />
          </div>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default Home;
