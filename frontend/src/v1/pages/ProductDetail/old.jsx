import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import "./Productdetail.css";
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
  }, [dispatch, success, id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="container productdetail">
            <div className="productdetail_section">
              <div className="productdetail-carousel">
                <div id="productDetail" className="carousel slide">
                  <div className="carousel-indicators">
                    {product?.images.map((image, index) => {
                      return (
                        <>
                          <button
                            type="button"
                            data-bs-target="#productDetail"
                            data-bs-slide-to={`${index}`}
                            className="active"
                            aria-current="true"
                            aria-label={`Slider ${index}`}
                          ></button>
                        </>
                      );
                    })}
                  </div>
                  <div className="carousel-inner">
                    {product?.images.map((image) => {
                      return (
                        <>
                          <div className="carousel-item active">
                            <img
                              src={image.url}
                              className="d-block w-100"
                              alt={image.url}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="productdetail_content">
                <div className="producdetail_content_container">
                  <h2 className="productdetail-name">{product?.name}</h2>
                  <p className="productdetail-id"># {product?._id}</p>
                  <div className="productdetail-ratings">
                    <StarRatings
                      rating={product?.ratings ? product.ratings : 5}
                      starRatedColor="#FFC107"
                      numberOfStars={5}
                      name="rating"
                      starHoverColor="#FFC107"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                    <span> ({product?.numOfReview} reviews)</span>
                  </div>
                  <div className="quanlity-cart">
                    <button onClick={() => setQuanlityCart(quanlityCart + 1)}>
                      +
                    </button>
                    <input type="number" value={quanlityCart} readOnly />
                    <button
                      onClick={() => {
                        if (quanlityCart > 1) {
                          setQuanlityCart(quanlityCart - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <button className="detail-to-cart" onClick={handleAddCart}>
                      Add to cart
                    </button>
                  </div>
                  <div className="productdetail-price">
                    Price: {product?.price} đ
                  </div>
                  <div className="productdetail-name">
                    Status: {product?.stock > 0 ? "Instock" : "OutOfstock"}
                  </div>
                  <div className="productdetail-description">
                    Description: <p>{product?.description}</p>
                  </div>
                </div>
                <div className="button-review-group">
                  <button
                    className="button-review"
                    data-bs-toggle="modal"
                    data-bs-target="#submitReviewModal"
                  >
                    Submit review
                  </button>
                  <button
                    className="display-review"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    CLick to {isOpen ? "close" : "open"} Review{" "}
                    {isOpen ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="listReviews container">
              {product?.reviews && product?.reviews[0] ? (
                product.reviews.map((review) => {
                  return (
                    <div className="listReview">
                      <h4 className="listReview-header">{review.name}</h4>
                      <div className="listReview-body">
                        <StarRatings
                          rating={review.rating}
                          starRatedColor="#FFC107"
                          numberOfStars={5}
                          name="rating"
                          starHoverColor="#FFC107"
                          starDimension="20px"
                          starSpacing="2px"
                        />
                        <h5 className="listReview-title">Comment: </h5>
                        <p className="listReview-text">{review.comment}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h4 className="listReview-nocontent">No reviews</h4>
              )}
            </div>
          )}
          <div
            className="modal fade"
            id="submitReviewModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Product review
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="newRatings">
                    Ratings:
                    <StarRatings
                      rating={ratings}
                      starRatedColor="#FFC107"
                      numberOfStars={5}
                      name="rating"
                      starHoverColor="#FFC107"
                      starDimension="20px"
                      starSpacing="2px"
                      changeRating={changeRatings}
                    />
                    <h5>Product comment: </h5>
                    <textarea
                      cols="30"
                      rows="2"
                      required
                      id="review-description"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="write review..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleAddSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Productdetail;
