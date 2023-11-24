import SliderProduct from "../../components/ProductCarousel/ProductCarousel";
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
const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, error, ssproducts, xiaoproducts, approducts, opproducts } =
    useSelector((state) => state.productshome);
  const { error: errorCart, success: successCart } = useSelector(
    (state) => state.cart
  );

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
  }, [dispatch, error, errorCart, successCart]);
  useEffect(() => {
    dispatch(getHotProduct());
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Home">
          <div className="container">
            <HomeBannerCarousel />
            <SliderProduct datas={approducts} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
