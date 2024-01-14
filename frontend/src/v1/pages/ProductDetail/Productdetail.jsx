import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../../components/Carousel/Carousel";
import {
  FaCheckCircle,
  FaFacebook,
  FaFacebookF,
  FaHeart,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  newReview,
} from "../../reduxToolkit/actions/productAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/product/productDetailSlice";

import Loader from "../../components/Loader/Loader";
import { addItemToCart } from "../../reduxToolkit/actions/cartAction";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import "./product-detail.css";
import Carousel from "../../components/Carousel/Carousel";
import CardProductDetail from "../../components/CardProductDetail/CardProductDetail";
import ProductDetailTabs from "./ProductDetailTabs";
import ProductDetailCarousel from "./ProductDetailCarousel";
import ProductCompare from "./ProductCompare";
const Productdetail = ({ HeaderComponent, FooterComponent }) => {
  const dispatch = useDispatch();
  const { error, isLoading, product } = useSelector(
    (state) => state.productDetail
  );

  const { success: successCart, error: errorCart } = useSelector(
    (state) => state.cart
  );
  const detailCarouselResponsive = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
  };
  const detailCarouselModule = ["Autoplay", "Grid", "Navigation"];
  const { id } = useParams();
  const [quantityCart, setQuantityCart] = useState(1);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleAddSubmit = () => {
    const myForm = new FormData();
    myForm.set("rating", ratings);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
  };
  const changeRatings = (newRating, name) => {
    setRatings(newRating);
  };
 
  const handleAddCart = () => {
    dispatch(addItemToCart({ id, quantityCart }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    
    if (errorCart) {
      toast.error(errorCart);
      dispatch(clearErrorCart());
    }
    if (successCart) {
      toast.success("Product added ro cart");
      dispatch(resetToCart());
    }
  }, [dispatch, error, errorCart, successCart]);
  useEffect(() => {
    
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
  return (
    <>
      <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-detail">
          <div className="container">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <span className="fw-bold">Home</span>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    categories
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {product?.name}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-6 product-detail-image d-flex flex-column align-items-center justify-content-center">
                <ProductDetailCarousel datas={product?.images} />
              </div>
              <div className="col-6 product-detail-content">
                <p className="name">{product?.name}</p>
                <div className="ratings">
                  <StarRatings
                    rating={product?.ratings ? product.ratings : 5}
                    starRatedColor="#FFC107"
                    numberOfStars={5}
                    name="rating"
                    starHoverColor="#FFC107"
                    starDimension="20px"
                    starSpacing="2px"
                  />
                  <span className="number-rating">
                    {" "}
                    ({product?.numOfReview} reviews)
                  </span>
                </div>
                <p className="price">$ {Math.round(product?.price/23000)}</p>
                <div className="quality">
                  <span>QTY:</span>
                  <input
                    className="form-control"
                    readOnly
                    defaultValue={1}
                    type="number"
                    min={0}
                  />
                </div>
                <div className="colors">
                  <span>Color: </span>
                  <button className="btn btn-sm color-item"></button>
                  <button
                    className="btn btn-sm color-item"
                    style={{ backgroundColor: "black" }}
                  ></button>
                  <button
                    className="btn btn-sm color-item"
                    style={{ backgroundColor: "#cec2c2" }}
                  ></button>
                </div>
                <button
                  onClick={handleAddCart}
                  className="btn btn-sm btn-primary btn-add-cart text-uppercase"
                >
                  Add to cart
                </button>
                <div className="wish-and-compare">
                  <button className="btn btn-sm wish-button">
                    <FaHeart /> Add wish list
                  </button>
                  <ProductCompare product={product}/>
                </div>
                <div className="share-group">
                  <span>Share this product: </span>
                  <button>
                    <FaFacebook />
                  </button>
                  <button>
                    <FaTwitter />
                  </button>
                </div>
              </div>
            </div>
            <ProductDetailTabs description={product?.description} productId={product?._id}/>
            <div className="related-products text-center">
              <p>Related Products</p>
            </div>
          </div>
        </div>
      )}
      
      <FooterComponent />
    </>
  );
};

export default Productdetail;
