import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

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
} from "../../reduxToolkit/reducer/product/productReviewSlice";
import Loader from "../../components/Loader/Loader";
const Productdetail = () => {
  const dispatch = useDispatch();
  const { error, isLoading, product } = useSelector(
    (state) => state.productdetail
  );
  const { error: errorReview, success } = useSelector(
    (state) => state.newReview
  );
  const { id } = useParams();
  const [quanlityCart, setQuanlityCart] = useState(1);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  console.log(comment);
  console.log(ratings);
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
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorReview) {
      toast.error(errorReview);
      dispatch(clearErrorReview());
    }
    if (success) {
      toast.success("Your's review created!");
      dispatch(newReviewReset());
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error, toast, errorReview, success]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "100vh",
              justifyContent: "center",
            }}
          >
            <div className="productdetail">
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
                          >
                            test
                          </button>
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
              <div className="productdetail-content">
                <h2 className="productdetail-name">{product?.name}</h2>
                <p className="productdetail-id"># {product?._id}</p>
                <div className="productdetail-ratings">
                  <StarRatings
                    rating={product?.ratings ? product.ratings : 5}
                    starRatedColor="rgb(255, 255, 0)"
                    numberOfStars={5}
                    name="rating"
                    starHoverColor="rgb(255, 191, 0)"
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
                  <button className="detail-to-cart">Add to cart</button>
                </div>
                <div className="productdetail-price">{product?.price} đ</div>
                <div className="productdetail-name">
                  Status: {product?.stock > 0 ? "Instock" : "OutOfstock"}
                </div>
                <div className="productdetail-description">
                  Description: <p>{product?.description}</p>
                </div>
                <button
                  className="button-review"
                  data-bs-toggle="modal"
                  data-bs-target="#submitReviewModal"
                >
                  Submit review
                </button>
              </div>
            </div>
            <h3>Reviews</h3>
            <div className="listReview">
              {product?.reviews && product?.reviews[0] ? (
                product.reviews.map((review) => {
                  return (
                  <div className="card">
                    <div className="card-header">{review.name}</div>
                    <div className="card-body">
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="rgb(255, 255, 0)"
                        numberOfStars={5}
                        name="rating"
                        starHoverColor="rgb(255, 191, 0)"
                        starDimension="20px"
                        starSpacing="2px"
                      />
                      <h5 className="card-title">Comment: </h5>
                      <p className="card-text">{review.comment}</p>
                    </div>
                  </div>)
                })
              ) : (
                <div>No reviews</div>
              )}
            </div>
          </div>
          <div
            className="modal fade"
            id="submitReviewModal"
            tabindex="-1"
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
