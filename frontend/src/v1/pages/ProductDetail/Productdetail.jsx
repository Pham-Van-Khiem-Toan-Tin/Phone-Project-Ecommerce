import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  newReview,
} from "../../reduxToolkit/actions/productAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/product/productDetailSlice";
import {
  clearErrorReview,
  newReviewReset,
} from "../../reduxToolkit/reducer/product/newReviewSlice";
import Loader from "../../components/Loader/Loader";
import { addItemToCart } from "../../reduxToolkit/actions/cartAction";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import "./product-detail.css";
const Productdetail = () => {
  const dispatch = useDispatch();
  const { error, isLoading, product } = useSelector(
    (state) => state.productDetail
  );
  const { error: errorReview, success } = useSelector(
    (state) => state.newReview
  );
  const { success: successCart, error: errorCart } = useSelector(
    (state) => state.cart
  );
  const { id } = useParams();
  const [quanlityCart, setQuanlityCart] = useState(1);
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
    dispatch(addItemToCart({ id, quanlityCart }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorReview) {
      toast.error(errorReview);
      dispatch(clearErrorReview());
    }
    if (errorCart) {
      toast.error(errorCart);
      dispatch(clearErrorCart());
    }
    if (successCart) {
      toast.success("Product added ro cart");
      dispatch(resetToCart());
    }
  }, [dispatch, error, errorReview, errorCart, successCart]);
  useEffect(() => {
    if (success) {
      toast.success("Your's review created!");
      dispatch(newReviewReset());
    }
    dispatch(getProductDetail(id));
    console.log(product);
  }, [dispatch, success, id]);
  return (
    <>
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
                    item
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-6 product-detail-image">
                <div className="image-primary">
                  <img
                    src={product?.images[0].url}
                    alt={product?.images[0]._id}
                  />
                </div>
                <div className="image-detail-carousel"></div>
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
                <p className="price">
                 $ {product?.price}
                </p>
                <div className="quality">
                  <span>QTY:</span>
                  <input className="form-control" type="number" min={0} />
                </div>
                <div className="colors">
                  <span>Color: </span>
                  <button className="btn btn-sm color-item"></button>
                  <button className="btn btn-sm color-item"></button>
                  <button className="btn btn-sm color-item"></button>
                </div>
                <button className="btn btn-sm btn-primary btn-add-cart text-uppercase">Add to cart</button>
                <div className="trust-signal">
                  <FaCheckCircle /> <span>Shop secure, Free return</span>
                </div>
                <div className="wish-and-compare">
                  <button className="btn btn-sm wish-button"><FaHeart /> Add wish list</button>
                  <button className="btn btn-sm compare-button"><BiGitCompare /> Add to compare</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Productdetail;
